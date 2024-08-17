import { NextFunction, Request } from 'express'
import Log from '@lunacrew/logger'
import { GeneralUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'

export default class GetUserService {
  static execute(req: Request, next: NextFunction): GeneralUserQuery {
    try {
      const params = {
        id: req.query.id,
        email: req.query.email
      }

      return ValidateUser(params, next)
    } catch (error) {
      Log.e(`${error}`, 'GetUserService')
    }
  }
}
