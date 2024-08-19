import { NextFunction, Request } from 'express'
import Log from '@lunacrew/logger'
import { UpdateUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'

export default class LoginService {
  static execute(req: Request, next: NextFunction): UpdateUserQuery {
    try {
      let data: { $set: object } | null = { $set: {} }
      const params = {
        id: req.params.id
      }

      const validateParams = ValidateUser(params, next)

      if (validateParams) {
        data = this._buildData()
      }

      return { filter: { $and: [{ _id: params.id }] }, data }
    } catch (error) {
      Log.e(`${error}`, 'LoginService')
      next(error)
    }
  }

  private static _buildData(): { $set: object } | null {
    const data: { $set: object } = { $set: {} }
    const currentDate = new Date().toISOString()

    data.$set = {
      updatedAt: currentDate,
      disabledAt: null,
      expiresIn: null,
      isDisabled: false
    }

    return data
  }
}
