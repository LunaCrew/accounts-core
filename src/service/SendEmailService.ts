import { NextFunction, Request } from 'express'
import { SendEmailQuery } from '../types/Query'
import { Validation } from '../types/Validation'
import VerificationCode from '../util/security/VerificationCode'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class SendEmailService {
  private static readonly _token = VerificationCode.generate(8)

  public static readonly execute = (req: Request, next: NextFunction): SendEmailQuery => {
    try {
      const params = {
        id: req.params.id,
        isEmailValidation: req.query.isEmailValidation?.valueOf() === 'true',
      }

      const isValid = ValidateUser(params, next)

      if (isValid) {
        const data = this._buildData(params.isEmailValidation)
        return { filter: { $and: [{ _id: params.id }] }, data, token: this._token }
      }
    } catch (error) {
      Log.error(`SendEmailService :: ${error}`, 'service')
      next(error)
    }
  }

  private static readonly _buildData = (isEmailValidation: boolean) => {
    const currentDate = new Date()
    const currentTimePlusOneHour = new Date(currentDate.getTime() + 60 * 60 * 1000)

    const data: { $set: Validation } = {
      $set: {
        token: VerificationCode.generate(8),
        tokenExpiration: currentTimePlusOneHour.toISOString(),
        updatedAt: currentDate.toISOString()
      }
    }

    if (isEmailValidation) data.$set.validated = false

    return data
  }
}
