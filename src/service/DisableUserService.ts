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
      Log.e(`${error}`, 'DisableUserService')
    }
  }

  private static _buildData(): { $set: object } | null {
    const data: { $set: object } = { $set: {} }
    const currentDate = new Date().toISOString()
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)

    data.$set = {
      updatedAt: currentDate,
      disabledAt: currentDate,
      expiresIn: expirationDate.toISOString(),
      isDisabled: true
    }

    return data
  }
}
