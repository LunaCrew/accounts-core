import { NextFunction, Request } from 'express'
import { v4 as newUUID } from 'uuid'
import { BadRequest } from '../error/CustomError'
import { userCreate } from '../schema/userSchema'
import { GeneralUserQuery } from '../types/Query'
import { User } from '../types/User'
import Log from '../util/log/Log'
import Password from '../util/security/Password'
import VerificationCode from '../util/security/VerificationCode'

export default class CreateUserService {
  public static readonly execute = (req: Request, next: NextFunction): GeneralUserQuery => {
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
      Log.error('service', 'CreateUserService', error)
      next(error)
      return null
    }
  }

  private static readonly _buildQuery = (user: User): object => {
    const currentTime = new Date()
    const currentTimePlusOneHour = new Date(currentTime.getTime() + 60 * 60 * 1000)

    user._id = newUUID()
    user.password = Password.encrypt(user.password)
    user.createdAt = currentTime.toISOString()
    user.isDisabled = false
    user.emailStatus = {
      validated: false,
      token: VerificationCode.generate(8),
      tokenExpiration: currentTimePlusOneHour.toISOString()
    }
    return user
  }
}
