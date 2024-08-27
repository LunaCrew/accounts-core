import { NextFunction, Request } from 'express'
import { UpdateUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import { userUpdate } from '../schema/userSchema'
import { BadRequest } from '../error/CustomError'
import Password from '../util/security/Password'
import Log from '../util/log/Log'

export default class UpdateUserService {
  public static readonly execute = (req: Request, next: NextFunction): UpdateUserQuery => {
    try {
      let data: { $set: object } | null = { $set: {} }

      const params = {
        id: req.params.id
      }

      const filter = ValidateUser(params, next)

      if (filter) {
        data = this._buildData(req, next)
      }

      return { filter, data }
    } catch (error) {
      Log.error('service', `UpdateUserService :: ${error}`)
      next(error)
    }
  }

  private static readonly _buildData = (req: Request, next: NextFunction): { $set: object } => {
    const { error, value } = userUpdate.validate(req.body)
    const data: { $set: object } = { $set: {} }

    if (error) {
      const message = error.details[0].message
      next(new BadRequest(message))
      next()
    } else {
      value.updatedAt = new Date().toISOString()
      if (value.password) value.password = Password.encrypt(value.password)

      data.$set = value
    }

    return data
  }
}
