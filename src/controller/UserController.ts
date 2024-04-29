import { NextFunction, Request, Response } from 'express'
import Log from '@ashtrindade/logger'
import { collections } from '../app'
import { NotFound } from '../error/CustomError'
import { UserService } from '../types/Service'
import CreateUserService from '../service/CreateUserService'
import GetUserService from '../service/GetUserService'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import DeleteUserService from 'src/service/DeleteUserService'

export default class UserController {

  public static readonly createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: UserService = CreateUserService.execute(req, next)
      if (!user) return

      const result = await collections.users.insertOne(user).catch((error) => {
        next(error)
      })

      if (result) {
        res.status(HttpStatus.code.CREATED).json({ id: result.insertedId })
      }
      Log.i('UserController :: Calling Endpoint :: CreateUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: CreateUser')
    }
  }

  public static readonly getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UserService = GetUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.findOne(query, { projection: { password: 0 } })

      if (result) {
        res.status(HttpStatus.code.OK).json(result)
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
      const query: UserService = DeleteUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.deleteOne(query).catch((error) => {
        next(error)
      })

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
}
