import { Request, Response } from 'express'
import { v4 as newUUID } from 'uuid'
import userSchema from '../schema/userSchema'
import Password from '../util/security/Password'
import HttpStatusCode from '../util/enum/HttpStatusCode'
import Logger from '../util/log/Logger'

class CreateUserService {
  static create(req: Request, res: Response): CreateUserService | null {
    try {
      const { error, value } = userSchema.validate(req.body)

      if (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.details })

        Logger.error(':: Service :: CreateUserService :: Validation ::', error)
        return null
      } else {
        const user = value
        user._id = newUUID()
        user.password = Password.encrypt(req.body.password)
        return user
      }
    } catch (error) {
      Logger.error(':: Service :: CreateUserService ::', error)
      return null
    }
  }
}

export default CreateUserService.create
