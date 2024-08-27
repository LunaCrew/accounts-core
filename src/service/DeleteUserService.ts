import { NextFunction, Request } from 'express'
import { GeneralUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class DeleteUserService {
  public static readonly execute = (req: Request, next: NextFunction): GeneralUserQuery => {
    try {
      interface Filter {
        id: string | undefined
        forced: boolean
      }

      const params = {
        id: req.params.id,
        forced: req.query.forced?.valueOf() === 'true'
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
      Log.error(`DeleteUserService :: ${error}`, 'service')
      next(error)
    }
  }
}
