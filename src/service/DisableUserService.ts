import { NextFunction, Request } from 'express'
import { UpdateUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class DisableUserService {
  public static readonly execute = (req: Request, next: NextFunction): UpdateUserQuery => {
    try {
      let data: { $set: object } | null = { $set: {} }

      const params = {
        id: req.params.id
      }

      const isValid = ValidateUser(params, next)

      if (isValid) {
        data = this._buildData()
        return { filter: { $and: [{ _id: params.id }] }, data }
      }
    } catch (error) {
      Log.error(`DisableUserService :: ${error}`, 'service')
      next(error)
    }
  }

  private static readonly _buildData = (): { $set: object } => {
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
