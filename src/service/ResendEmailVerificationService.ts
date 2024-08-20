import { NextFunction, Request } from 'express'
import { UpdateUserQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'
import VerificationCode from '../util/security/VerificationCode'

export default class ResendEmailVerificationService {
  static execute(req: Request, next: NextFunction): UpdateUserQuery {
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
      Log.error(`ResendEmailVerificationService :: ${error}`, 'service')
      next(error)
    }
  }

  private static _buildData(): { $set: object } | null {
    const data: { $set: object } = { $set: {} }
    const currentDate = new Date()
    const currentTimePlusOneHour = new Date(currentDate.getTime() + 60 * 60 * 1000)

    data.$set = {
      updatedAt: currentDate.toISOString(),
      emailVerification : {
        verified: false,
        token: VerificationCode.generate(8),
        tokenExpiration: currentTimePlusOneHour.toISOString()
      }
    }

    return data
  }
}
