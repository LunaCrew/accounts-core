import { NextFunction, Request } from 'express'
import { SendEmailQuery } from '../types/Query'
import { Validation } from '../types/Validation'
import Log from '../util/log/Log'
import VerificationCode from '../util/security/VerificationCode'
import ValidateUser from '../util/validation/ValidateUser'

export default class SendEmailService {

  public static readonly execute = (req: Request, next: NextFunction): SendEmailQuery => {
    try {
      interface Filter {
        id: string | undefined
        isEmailValidation: boolean
      }

      const params = {
        id: req.params.id,
        isEmailValidation: req.query.isEmailValidation?.valueOf() === 'true',
      } as Filter

      const isValid = ValidateUser(params, next)

      const token = VerificationCode.generate(8)
      if (isValid) {
        const data = this._buildData(params.isEmailValidation, token)
        return { filter: { $and: [{ _id: params.id }] }, data, token: token }
      }
    } catch (error) {
      Log.error('service', 'SendEmailService', error)
      next(error)
    }
  }

  private static readonly _buildData = (isEmailValidation: boolean, token: string) => {
    const currentDate = new Date()
    const currentTimePlusOneHour = new Date(currentDate.getTime() + 60 * 60 * 1000)

    const updateEmailStatus: { $set: Validation } = {
      $set: {
        emailStatus: {
          validated: false,
          token: token,
          tokenExpiration: currentTimePlusOneHour.toISOString()
        },
        updatedAt: currentDate.toISOString()
      }
    }

    const updateVerificationData: { $set: Validation } = {
      $set: {
        verificationData: {
          token: token,
          tokenExpiration: currentTimePlusOneHour.toISOString()
        },
        updatedAt: currentDate.toISOString()
      }
    }

    if (isEmailValidation) {
      return updateEmailStatus
    } else {
      return updateVerificationData
    }
  }
}
