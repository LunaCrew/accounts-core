import { Request, Response } from 'express'
import { collections } from '../app'
import HttpStatusCode from '../util/enum/HttpStatusCode'
import ParserError from '../util/parser/ParserError'
import CreateUserService from '../service/CreateUserService'
import GetUserService from '../service/GetUserService'
import Logger from '../util/log/Logger'

export default class UserController {
  public static createUser = async (req: Request, res: Response) => {
    try {
      const user = CreateUserService(req, res)
      if (!user) return

      const result = await collections.users.insertOne(user)

      if (result) {
        res.status(HttpStatusCode.CREATED).json({ id: result.insertedId })
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
          ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'internal error')
        )
        Logger.error(':: Controller :: UserController :: CreateUser ::', result)
      }
      Logger.info(':: Calling Endpoint :: CreateUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: CreateUser ::', error)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occurred')
      )
    }
  }

  public static getUser = async (req: Request, res: Response) => {
    try {
      const query = new GetUserService(req, res)
      const result = await collections.users.findOne(query, { projection: { password: 0 } })

      if (result) {
        res.status(HttpStatusCode.OK).json(result)
      } else {
        res.status(HttpStatusCode.NOT_FOUND).json(
          ParserError.http(HttpStatusCode.NOT_FOUND, 'not found')
        )
      }
      Logger.info(':: Calling Endpoint :: GetUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: GetUser ::', error)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occurred')
      )
    }
  }
}
