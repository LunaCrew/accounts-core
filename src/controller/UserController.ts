import { NextFunction, Request, Response } from 'express'
import { collections } from '../app'
import { NotFound } from '../error/CustomError'
import { UserService } from '../types/Service'
import CreateUserService from '../service/CreateUserService'
import GetUserService from '../service/GetUserService'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import Logger from '../util/log/Logger'

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
      Logger.info(':: Calling Endpoint :: CreateUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: CreateUser ::', `${error}`)
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
      Logger.info(':: Calling Endpoint :: GetUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: GetUser ::', `${error}`)
    }
  }
}
