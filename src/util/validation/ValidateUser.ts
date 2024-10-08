import { NextFunction } from 'express'
import { userQueryParams } from '../../schema/userSchema'
import { UserParams } from '../../types/User'
import { BadRequest } from '../../error/CustomError'

export default function ValidateUser(params: object, next: NextFunction) {
  const { error, value } = userQueryParams.validate(params)
  if (error) {
    const message = error.details[0].message
    next(new BadRequest(message))
    next()
  } else {
    return _buildQuery(value)
  }
}

function _buildQuery(params: UserParams): object {
  const query: { $and: Array<object> } = { $and: [] }

  if (params.id) query.$and.push({ _id: params.id })
  if (params.email) query.$and.push({ email: params.email })

  return query
}
