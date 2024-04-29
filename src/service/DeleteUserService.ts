import { NextFunction, Request } from 'express'
import Log from '@ashtrindade/logger'
import { UserParams } from '../types/User'
import { UserService } from '../types/Service'
import { userParams } from '../schema/userSchema'
import { ValidationError } from '../error/CustomError'

export default class DeleteUserService {
  static execute(req: Request, next: NextFunction): UserService {
    try {
      const params = {
        id: req.params.id
      }

      const { error, value } = userParams.validate(params)
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
      Log.e(`${error}`, 'DeleteUserService')
    }
  }

  private static _buildQuery(params: UserParams): object {
    const query: { $and: Array<object> } = { $and: [] }

    if (params.id) query.$and.push({ _id: params.id })

    return query
  }
}
