import { Request, Response } from 'express'
import { userParams } from '../schema/userSchema'
import ParserError from '../util/parser/ParserError'
import HttpStatusCode from '../util/enum/HttpStatusCode'
import Logger from '../util/log/Logger'

export default class GetUserService {
  constructor(req: Request, res: Response) {
    try {
      const params = {
        id: req.query.id,
        email: req.query.email,
        username: req.query.username
      }

      const { error } = userParams.validate(params)
      if (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.details })
        return
      }

      const query: { $and: Array<object> } = { $and: [] }
      if (params.id) query.$and.push({ _id: params.id })
      if (params.email) query.$and.push({ email: params.email })
      if (params.username) query.$and.push({ username: params.username })

      if (query.$and.length === 0) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          ParserError.http(HttpStatusCode.BAD_REQUEST, 'id, email or username is required')
        )
        return
      }

      return query
    } catch (error) {
      Logger.error(':: Service :: GetUserService ::', error)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occurred')
      )
    }
  }
}