import { NextFunction, Request } from 'express'
import { GeneralUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class GetUserService {
  static execute(req: Request, next: NextFunction): GeneralUserQuery {
    try {
      const params = {
        id: req.query.id,
        email: req.query.email
      }

      return ValidateUser(params, next)
    } catch (error) {
      Log.error(`${error}`, 'GetUserService')
      next(error)
    }
  }
}
