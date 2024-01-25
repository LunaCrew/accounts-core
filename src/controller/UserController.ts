import { Request, Response } from 'express'
import { v4 as newUUID } from 'uuid'
import { usersCollection } from '../app'
import userSchema from '../schema/userSchema'
import HttpStatusCode from '../util/enum/HttpStatusCode'
import Password from '../util/security/Password'
import ParserError from '../util/parser/ParserError'
import { userParams } from '../schema/userSchema'
import Logger from '../util/log/Logger'

export default class UserController {
  public static createUser = (req: Request, res: Response) => {
    const { error, value } = userSchema.validate(req.body)
    const user = value

    if (error) {
      res.status(parseInt(HttpStatusCode.BAD_REQUEST)).json({ error: error.details })
      return
    }

    user._id = newUUID()
    user.password = Password.encrypt(req.body.password)

    try {
      usersCollection.insertOne(user).then((result) => {
        if (result) {
          res.status(parseInt(HttpStatusCode.CREATED)).json(result)
        } else {
          res.status(parseInt(HttpStatusCode.INTERNAL_SERVER_ERROR)).json(
            ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'internal error')
          )
        }
      })
      Logger.info(':: Calling Endpoint :: CreateUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: CreateUser ::', error)
      res.status(parseInt(HttpStatusCode.INTERNAL_SERVER_ERROR)).json(
        ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occurred')
      )
    }
  }

  public static getUser = (req: Request, res: Response) => {
    const params = {
      id: req.query.id,
      email: req.query.email,
      username: req.query.username
    }
    
    
    const { error } = userParams.validate(params)
    if (error) {
      res.status(parseInt(HttpStatusCode.BAD_REQUEST)).json({ error: error.details })
      return
    }
    
    try {
      const query: { $and: Array<object> } = { $and: [] }
      if (params.id) query.$and.push({ _id: params.id })
      if (params.email) query.$and.push({ email: params.email })
      if (params.username) query.$and.push({ username: params.username })

      if (query.$and.length === 0) {
        res.status(parseInt(HttpStatusCode.BAD_REQUEST)).json(
          ParserError.http(HttpStatusCode.BAD_REQUEST, 'id, email or username is required')
        )
        return
      }

      usersCollection.findOne(query, { projection: { password: 0 } }).then((result) => {
        if (result) {
          res.status(parseInt(HttpStatusCode.OK)).json(result)
        } else {
          res.status(parseInt(HttpStatusCode.NOT_FOUND)).json(
            ParserError.http(HttpStatusCode.NOT_FOUND, 'not found')
          )
        }
      })
      Logger.info(':: Calling Endpoint :: GetUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: GetUserById ::', error)
      res.status(parseInt(HttpStatusCode.INTERNAL_SERVER_ERROR)).json(
        ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'An error occurred')
      )
    }
  }
}
