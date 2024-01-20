import { Request, Response } from 'express'
import { v4 as newUUID } from 'uuid'
import HttpStatusCode from 'src/util/enum/HttpStatusCode'
import Password from 'src/util/security/Password'
import ParserError from 'src/util/parser/ParserError'
import userSchema from 'src/schema/userSchema'
import { usersCollection } from 'src/app'
import Logger from 'src/util/log/Logger'

export default class UserController {
  public static createUser = async (req: Request, res: Response): Promise<void> => {
    const { error, value } = userSchema.validate(req.body)
    const user = value

    if (error) {
      res.status(parseInt(HttpStatusCode.BAD_REQUEST)).json({ error: error.details })
      return
    }

    user._id = newUUID()
    user.password = Password.encrypt(req.body.password)

    try {
      await usersCollection.insertOne(user).then((result) => {
        if (result) {
          res.status(parseInt(HttpStatusCode.CREATED)).json(result)
        } else {
          res.status(parseInt(HttpStatusCode.INTERNAL_SERVER_ERROR)).json(ParserError.http(HttpStatusCode.INTERNAL_SERVER_ERROR, 'internal error'))
        }
      })
      Logger.info(':: Calling Endpoint :: CreateUser ::')
    } catch (error) {
      Logger.error(':: Controller :: UserController :: CreateUser ::', error)
    }
  }
}
