import { NextFunction, Request, Response } from 'express'
import { collections } from '../app'
import { BadRequest, InternalServerError, NotFound } from '../error/CustomError'
import CreateUserService from '../service/CreateUserService'
import DeleteUserService from '../service/DeleteUserService'
import DisableUserService from '../service/DisableUserService'
import GetUserService from '../service/GetUserService'
import LoginService from '../service/LoginService'
import UpdateUserService from '../service/UpdateUserService'
import { GeneralUserQuery, UpdateUserQuery } from '../types/Query'
import { User } from '../types/User'
import { EmailInfo } from '../types/Email'
import Mailer from '../util/tasks/Mailer'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import JWT from '../util/security/JWT'
import Password from '../util/security/Password'
import Log from '../util/log/Log'

export default class UserController {
  public static readonly createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: GeneralUserQuery = CreateUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.insertOne(query)

      if (result) {
        const user = query as User
        const emailInfo: EmailInfo = {
          receiverName: user.name,
          receiverEmail: user.email,
          token: user.emailStatus.token,
          language: user.settings.language
        }

        const sendEmailValidation = await Mailer.sendVerificationCode(emailInfo)
        const token = JWT.generate(result.insertedId.toString())

        res.status(HttpStatus.code.CREATED).send({
          id: result.insertedId,
          token: token,
          emailDelivered: sendEmailValidation
        })
      } else {
        next(new BadRequest(CustomErrorMessage.BAD_REQUEST))
        next()
      }

      Log.info('controller', 'UserController :: Calling Endpoint :: CreateUser')
    } catch (error) {
      Log.error('controller', `UserController :: CreateUser :: ${error}`)
      next(error)
    }
  }

  public static readonly getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: GeneralUserQuery = GetUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.findOne(query, { projection: { password: 0 } })

      if (result) {
        res.status(HttpStatus.code.OK).send(result)
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.info('controller', 'UserController :: Calling Endpoint :: GetUser')
    } catch (error) {
      Log.error('controller', `UserController :: GetUser :: ${error}`)
      next(error)
    }
  }

  public static readonly deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: GeneralUserQuery = DeleteUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.deleteOne(query)

      if (result?.deletedCount) {
        res.status(HttpStatus.code.NO_CONTENT).send()
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.info('controller', 'UserController :: Calling Endpoint :: DeleteUser')
    } catch (error) {
      Log.error('controller', `UserController :: DeleteUser :: ${error}`)
      next(error)
    }
  }

  public static readonly disableUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UpdateUserQuery = DisableUserService.execute(req, next)
      if (!query?.filter || !query.data) return

      const user = await collections.users.findOne(query.filter, { projection: { _id: 1, isDisabled: 1 } })
      if (user) {
        const isEnabled = !user?.isDisabled
        if (isEnabled) {
          const result = await collections.users.findOneAndUpdate(
            query.filter,
            query.data,
            { returnDocument: 'after', projection: { _id: 1, isDisabled: 1 } }
          )
          if (result) {
            // TODO: send deactivation email
            res.status(HttpStatus.code.OK).send(result)
          } else {
            next(new InternalServerError(CustomErrorMessage.INTERNAL_SERVER_ERROR))
            next()
          }
        } else {
          next(new BadRequest(CustomErrorMessage.USER_ALREADY_DISABLED))
          next()
        }
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.info('controller', 'UserController :: Calling Endpoint :: DisableUser')
    } catch (error) {
      Log.error('controller', `UserController :: DisableUser :: ${error}`)
      next(error)
    }
  }

  public static readonly userLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UpdateUserQuery = LoginService.execute(req, next)
      if (!query?.filter || !query?.data) return

      const user = await collections.users.findOne(query.filter, { projection: { password: 1, _id: 1, isDisabled: 1 } })

      if (!user) {
        next(new BadRequest(CustomErrorMessage.LOGIN_FAILED))
        next()
      } else {
        const isValidPassword = Password.validate(req.body.password, user.password)
        const isDisabled = user?.isDisabled

        if (isValidPassword) {
          if (isDisabled) {
            await this._reEnableUser(user._id.toString(), query.filter, query.data, res, next)
          } else {
            const token = JWT.generate(user._id.toString())
            res.status(HttpStatus.code.OK).send({ token: token })
          }
        } else {
          next(new BadRequest(CustomErrorMessage.LOGIN_FAILED))
          next()
        }
      }
      Log.info('controller', 'UserController :: Calling Endpoint :: Login')
    } catch (error) {
      Log.error('controller', `UserController :: Login :: ${error}`)
      next(error)
    }
  }

  public static readonly updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UpdateUserQuery = UpdateUserService.execute(req, next)
      if (!query?.filter || !query.data) return

      const result = await collections.users.findOneAndUpdate(
        query.filter,
        query.data,
        { returnDocument: 'after', projection: { password: 0 } }
      )

      if (result) {
        res.status(HttpStatus.code.OK).send(result)
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }

      Log.info('controller', 'UserController :: Calling Endpoint :: UpdateUser')
    } catch (error) {
      Log.error('controller', `UserController :: UpdateUser :: ${error}`)
      next(error)
    }
  }

  private static readonly _reEnableUser = async (
    userId: string,
    filter: object,
    data: object,
    res: Response,
    next: NextFunction
  ) => {
    const result = await collections.users.findOneAndUpdate(
      filter,
      data,
      { returnDocument: 'after', projection: { _id: 1, isDisabled: 1 } }
    )

    if (result) {
      const token = JWT.generate(userId)
      res.status(HttpStatus.code.OK).send({ token: token })
    } else {
      next(new InternalServerError(CustomErrorMessage.INTERNAL_SERVER_ERROR))
      next()
    }
  }
}
