import { NextFunction, Request } from 'express'
import Log from '@lunacrew/logger'
import { UpdateUser } from '../types/Service'
import ValidateUser from '../util/validation/ValidateUser'

export default class DisableUserService {
  static execute(req: Request, next: NextFunction): UpdateUser {
    try {
      let data: { $set: object } | null = { $set: {} }

      const params = {
        id: req.params.id
      }

      const isValid = ValidateUser(params, next)

      if (isValid) {
        data = this._buildData()
      }

      return { filter: { $and: [{ _id: params.id }, { isDisabled: false }] }, data }
    } catch (error) {
      Log.e(`${error}`, 'UpdateUserService')
    }
  }

  private static _buildData(): { $set: object } | null {
    const data: { $set: object } = { $set: {} }
    const currentTimestamp = new Date().toISOString()

    data.$set = {
      updatedAt: currentTimestamp,
      disabledAt: currentTimestamp,
      isDisabled: true
    }

    return data
  }
}
