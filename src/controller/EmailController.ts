import { NextFunction, Request, Response } from 'express'
import { collections } from '../app'
import { BadRequest, InternalServerError, NotFound } from '../error/CustomError'
import SendEmailService from '../service/SendEmailService'
import ValidateEmailService from '../service/ValidateEmailService'
import { SendEmailQuery, UpdateUserQuery } from '../types/Query'
import { User } from '../types/User'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import Log from '../util/log/Log'

export default class EmailController {
  public static readonly sendEmailValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: SendEmailQuery = ValidateEmailService.execute(req, next)
      if (!query?.filter || !query?.data) return

      const result = await collections.users.findOne(query.filter, { projection: { _id: 1, emailStatus: 1 } })
      if (result) {
        const user = result as unknown as User

        const isValidated = user.emailStatus.validated
        const verificationCode = user.emailStatus?.token
        const codeExpiration = user.emailStatus?.tokenExpiration
        const currentTime = new Date().toISOString()

        const isInExpirationWindow = new Date(currentTime) < new Date(codeExpiration)
        const codeMatches = verificationCode === query.token.toUpperCase()

        const isCodeValid = isInExpirationWindow && codeMatches

        if (isValidated) {
          res.status(HttpStatus.code.NO_CONTENT).send(user)
        } else {
          await this._setVerifiedEmail(isCodeValid, query.filter, query.data, res, next)
        }
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.info('EmailController :: Calling Endpoint :: VerifyEmail', 'controller')
    } catch (error) {
      Log.error(`EmailController :: VerifyEmail :: ${error}`, 'controller')
      next(error)
    }
  }

  public static readonly sendVerificationCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UpdateUserQuery = SendEmailService.execute(req, next)
      if (!query?.filter || !query?.data) return

      // TODO: send email then update user
      const result = await collections.users.findOneAndUpdate(
        query.filter,
        query.data,
        { returnDocument: 'after', projection: { _id: 1, emailVerification: 1, settings: { language: 1 } } }
      )

      if (result) {
        res.status(HttpStatus.code.OK).send(result)
      } else {
        next(new InternalServerError(CustomErrorMessage.INTERNAL_SERVER_ERROR))
        next()
      }
      Log.info('EmailController :: Calling Endpoint :: SendVerificationCode', 'controller')
    } catch (error) {
      Log.error(`EmailController :: SendVerificationCode :: ${error}`, 'controller')
      next(error)
    }
  }

  //* private methods *//
  private static readonly _setVerifiedEmail = async (
    isTokenValid: boolean,
    filter: object,
    data: object,
    res: Response,
    next: NextFunction
  ) => {
    if (isTokenValid) {
      const result = await collections.users.findOneAndUpdate(
        filter,
        data,
        { returnDocument: 'after', projection: { _id: 1, emailStatus: 1 } }
      )
      if (result) {
        res.status(HttpStatus.code.OK).send(result)
      } else {
        next(new InternalServerError(CustomErrorMessage.INTERNAL_SERVER_ERROR))
        next()
      }
    } else {
      next(new BadRequest(CustomErrorMessage.INVALID_TOKEN))
      next()
    }
  }
}
