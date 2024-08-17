import { NextFunction, Request, Response } from 'express'
import Log from '@lunacrew/logger'
import { collections } from '../app'
import { NotFound, BadRequest } from '../error/CustomError'
import { GeneralUserQuery, UpdateUserQuery } from '../types/Query'
import CreateUserService from '../service/CreateUserService'
import GetUserService from '../service/GetUserService'
import DeleteUserService from '../service/DeleteUserService'
import UpdateUserService from '../service/UpdateUserService'
import DisableUserService from '../service/DisableUserService'
import LoginService from '../service/LoginService'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import Password from '../util/security/Password'
import JWT from '../util/security/JWT'

export default class UserController {
  public static readonly createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: GeneralUserQuery = CreateUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.insertOne(query)

      if (result) {
        res.status(HttpStatus.code.CREATED).send({ id: result.insertedId })
      } else {
        next(new BadRequest(CustomErrorMessage.BAD_REQUEST))
        next()
      }

      Log.i('UserController :: Calling Endpoint :: CreateUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: CreateUser')
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
      Log.i('UserController :: Calling Endpoint :: GetUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: GetUser')
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
      Log.i('UserController :: Calling Endpoint :: DeleteUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: DeleteUser')
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
            res.status(HttpStatus.code.OK).send(result)
          }
        } else {
          next(new BadRequest(CustomErrorMessage.USER_ALREADY_DISABLED))
          next()
        }
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.i('UserController :: Calling Endpoint :: DisableUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: DisableUser')
    }
  }

  public static readonly login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UpdateUserQuery = LoginService.execute(req, next)
      if (!query?.filter || !query?.data) return

      const user = await collections.users.findOne(query.filter, { projection: { password: 1, _id: 1, isDisabled: 1 } })

      if (!user) {
        next(new BadRequest(CustomErrorMessage.LOGIN_FAILED))
        next()
      } else {
        const isValid = Password.validate(req.body.password, user.password)
        const isDisabled = user?.isDisabled

        if (isValid) {
          if (isDisabled) {
            // re-enable user on login
            await collections.users.findOneAndUpdate(
              query.filter,
              query.data,
              { returnDocument: 'after', projection: { _id: 1, isDisabled: 1 } }
            )
          }

          const token = JWT.generate(user._id.toString())
          res.status(HttpStatus.code.OK).send({ token: token })
        } else {
          next(new BadRequest(CustomErrorMessage.LOGIN_FAILED))
          next()
        }
      }
      Log.i('UserController :: Calling Endpoint :: Login')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: Login')
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

      Log.i('UserController :: Calling Endpoint :: UpdateUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: UpdateUser')
    }
  }
}
