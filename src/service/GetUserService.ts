import { NextFunction, Request } from 'express'
import { GeneralUserQuery } from '../types/Query'
import Log from '../util/log/Log'
import ValidateUser from '../util/validation/ValidateUser'

export default class GetUserService {
  public static readonly execute = (req: Request, next: NextFunction): GeneralUserQuery => {
    try {
      const params = {
        id: req.query.id,
        email: req.query.email
      }

      return ValidateUser(params, next)
    } catch (error) {
      Log.error('service', 'GetUserService', error)
      next(error)
    }
  }
}
