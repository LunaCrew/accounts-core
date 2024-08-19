import { NextFunction, Request } from 'express'
import Log from '@lunacrew/logger'
import { UpdateUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import { userUpdate } from '../schema/userSchema'
import { ValidationError } from '../error/CustomError'
import Password from '../util/security/Password'

export default class UpdateUserService {
  static execute(req: Request, next: NextFunction): UpdateUserQuery {
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
      Log.e(`${error}`, 'UpdateUserService')
      next(error)
    }
  }

  private static _buildData(req: Request, next: NextFunction): { $set: object } | null {
    const { error, value } = userUpdate.validate(req.body)
    const data: { $set: object } = { $set: {} }

    if (error) {
      next(new ValidationError(error.details.map((detail) => {
        const key = detail.context?.key ?? ''
        return {
          [key]: detail.message
        }
      })))
      next()
      return null
    } else {
      value.updatedAt = new Date().toISOString()
      if (value.password) value.password = Password.encrypt(value.password)

      data.$set = value
    }

    return data
  }
}
