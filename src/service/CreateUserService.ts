import { Request, Response } from 'express'
import { v4 as newUUID } from 'uuid'
import userSchema from '../schema/userSchema'
import Password from '../util/security/Password'
import ParserError from '../util/parser/ParserError'
import HttpStatusCode from '../util/enum/HttpStatusCode'
import Logger from '../util/log/Logger'

export default class CreateUserService {
  constructor(req: Request, res: Response) {
    try {
      const { error, value } = userSchema.validate(req.body)
      const user = value

      if (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.details })
        return
      }

      user._id = newUUID()
      user.password = Password.encrypt(req.body.password)
      return user
    } catch (error) {
      Logger.error(':: Service :: CreateUserService ::', error)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occurred')
      )
    }
  }
}