import { NextFunction, Request } from 'express'
import { SendEmailQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class ValidateEmailService {
  public static readonly execute = (req: Request, next: NextFunction): SendEmailQuery => {
    try {
      const params = {
        id: req.params.id,
        token: req.params.token
      }

      const isValid = ValidateUser(params, next)

      if (isValid) {
        const currentDate = new Date().toISOString()
        const data = {
          $set: {
            updatedAt: currentDate,
            emailStatus: {
              validated: true,
              validatedAt: currentDate
            }
          }
        }
        return { filter: { $and: [{ _id: params.id }] }, data, token: params.token }
      }
    } catch (error) {
      Log.error('service', `VerifyEmailService :: ${error}`)
      next(error)
    }
  }
}
