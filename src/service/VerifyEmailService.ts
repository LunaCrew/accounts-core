import { NextFunction, Request } from 'express'
import { VerifyEmailQuery } from '../types/Query'
import ValidateUser from '../util/validation/ValidateUser'
import Log from '../util/log/Log'

export default class VerifyEmailService {
  static execute(req: Request, next: NextFunction): VerifyEmailQuery {
    try {
      let data: { set: { $set: object }, token: string } | null = { set: { $set: {} }, token: '' }

      const params = {
        id: req.params.id,
        token: req.params.token
      }

      const isValid = ValidateUser(params, next)

      if (isValid) {
        data = this._buildData(params.token)
        return { filter: { $and: [{ _id: params.id }] }, data }
      }
    } catch (error) {
      Log.error(`VerifyEmailService :: ${error}`, 'service')
      next(error)
    }
  }

  private static _buildData(token: string): { set: { $set: object }, token: string } | null {
    const data: { set: { $set: object }, token: string } = { set: { $set: {} }, token: '' }
    const currentDate = new Date().toISOString()

    data.token = token
    data.set = {
      $set: {
        updatedAt: currentDate,
        emailVerification : {
          verified: true,
          verifiedAt: currentDate
        }
      }      
    }

    return data
  }
}
