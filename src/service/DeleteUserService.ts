import { NextFunction, Request } from 'express'
import Log from '@lunacrew/logger'
import { GeneralUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'

export default class DeleteUserService {
  static execute(req: Request, next: NextFunction): GeneralUserQuery {
    try {
      interface Filter {
        id: string | undefined
        forced: boolean
      }

      const params = {
        id: req.params.id,
        forced: this._parseBoolean(req.query.forced?.toString())
      } as Filter

      const isValid = ValidateUser(params, next)

      if (isValid) {
        if (params.forced) {
          return { $and: [{ _id: params.id }] }
        } else {
          return { $and: [{ _id: params.id }, { isDisabled: true }] }
        }
      }
    } catch (error) {
      Log.e(`${error}`, 'DeleteUserService')
      next(error)
    }
  }

  private static _parseBoolean = (value: string | undefined): boolean => {
    return value === 'true'
  }
}
