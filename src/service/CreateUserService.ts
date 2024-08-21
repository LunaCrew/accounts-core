import { NextFunction, Request } from 'express'
import { v4 as newUUID } from 'uuid'
import { GeneralUserQuery } from '../types/Query'
import { User } from '../types/User'
import { userCreate } from '../schema/userSchema'
import { BadRequest } from '../error/CustomError'
import Password from '../util/security/Password'
import VerificationCode from '../util/security/VerificationCode'
import Log from '../util/log/Log'

export default class CreateUserService {
  static execute(req: Request, next: NextFunction): GeneralUserQuery {
    try {
      const { error, value } = userCreate.validate(req.body)

      if (error) {
        const message = error.details[0].message
        next(new BadRequest(message))
        next()
      } else {
        return this._buildQuery(value)
      }
    } catch (error) {
      Log.error(`CreateUserService :: ${error}`, 'service')
      next(error)
      return null
    }
  }

  private static _buildQuery(user: User): object {
    const currentTime = new Date()
    const currentTimePlusOneHour = new Date(currentTime.getTime() + 60 * 60 * 1000)

    user._id = newUUID()
    user.password = Password.encrypt(user.password)
    user.createdAt = currentTime.toISOString()
    user.isDisabled = false
    user.emailVerification = {
      verified: false,
      token: VerificationCode.generate(8),
      tokenExpiration: currentTimePlusOneHour.toISOString()
    }
    return user
  }
}
