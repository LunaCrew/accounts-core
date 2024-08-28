import { NextFunction, Request, Response } from 'express'
import { collections } from '../app'
import { BadRequest, InternalServerError, NotFound } from '../error/CustomError'
import SendEmailService from '../service/SendEmailService'
import ValidateEmailService from '../service/ValidateEmailService'
import { EmailInfo } from '../types/Email'
import { SendEmailQuery } from '../types/Query'
import { User } from '../types/User'
import Mailer from '../util/tasks/Mailer'
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
      Log.info('controller', 'EmailController :: Calling Endpoint :: VerifyEmail')
    } catch (error) {
      Log.error('controller', `EmailController :: VerifyEmail :: ${error}`)
      next(error)
    }
  }

  public static readonly sendVerificationCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: SendEmailQuery = SendEmailService.execute(req, next)
      if (!query?.filter || !query?.data) return

      const result = await collections.users.findOneAndUpdate(
        query.filter,
        query.data,
        {
          returnDocument: 'after', projection: {
            _id: 1,
            name: 1,
            emailStatus: 1,
            verificationData: 1,
            settings: { language: 1 }
          }
        }
      )

      if (result) {
        res.status(HttpStatus.code.OK).send(result)

        const user = result as unknown as User
        const emailInfo: EmailInfo = {
          receiverName: user.name,
          receiverEmail: user.email,
          token: query.token,
          language: user.settings.language
        }

        await Mailer.sendVerificationCode(emailInfo)
      } else {
        next(new InternalServerError(CustomErrorMessage.INTERNAL_SERVER_ERROR))
        next()
      }
      Log.info('controller', 'EmailController :: Calling Endpoint :: SendVerificationCode')
    } catch (error) {
      Log.error('controller', `EmailController :: SendVerificationCode :: ${error}`)
      next(error)
    }
  }

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
