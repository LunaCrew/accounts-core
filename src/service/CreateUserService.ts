import { NextFunction, Request } from 'express'
import { v4 as newUUID } from 'uuid'
import Log from '@lunacrew/logger'
import { GeneralUserQuery } from '../types/Query'
import { User } from '../types/User'
import { userCreate } from '../schema/userSchema'
import { ValidationError } from '../error/CustomError'
import Password from '../util/security/Password'

export default class CreateUserService {
  static execute(req: Request, next: NextFunction): GeneralUserQuery {
    try {
      const { error, value } = userCreate.validate(req.body)

      if (error) {
        next(new ValidationError(error.details.map((detail) => {
          const key = detail.context?.key ?? ''
          return {
            [key]: detail.message
          }
        })))
        next()
      } else {
        return this._buildQuery(value)
      }
    } catch (error) {
      Log.e(`${error}`, 'CreateUserService')
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
      token: newUUID(),
      tokenExpiration: currentTimePlusOneHour.toISOString()
    }
    return user
  }
}
