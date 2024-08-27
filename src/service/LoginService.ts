import { NextFunction, Request } from 'express'
import { UpdateUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class LoginService {
  public static readonly execute = (req: Request, next: NextFunction): UpdateUserQuery => {
    try {
      const currentDate = new Date().toISOString()
      const params = {
        email: req.params.email
      }

      const validateParams = ValidateUser(params, next)

      if (validateParams) {
        const data = {
          $set: {
            updatedAt: currentDate,
            disabledAt: null,
            expiresIn: null,
            isDisabled: false
          }
        }
        return { filter: { $and: [{ email: params.email }] }, data }
      }

    } catch (error) {
      Log.error(`LoginService :: ${error}`, 'service')
      next(error)
    }
  }
}
