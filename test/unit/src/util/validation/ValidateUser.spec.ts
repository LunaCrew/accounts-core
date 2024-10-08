import ValidateUser from 'src/util/validation/ValidateUser'
import { UserParams } from 'src/types/User'
import { BadRequest } from 'src/error/CustomError'

describe('ValidateUser', () => {
  it('should return a query object', () => {
    const params: UserParams = {
      id: '8fa40850-e31c-448a-9121-815b3cd5582a',
      email: 'example@example.com',
      forced: false
    }

    const next = jest.fn()

    const result = ValidateUser(params, next)

    expect(result).toBeDefined()
    expect(result).toEqual({ $and: [{ _id: '8fa40850-e31c-448a-9121-815b3cd5582a' }, { email: 'example@example.com' }] })
  })

  it('should call next with an error', () => {
    const params: UserParams = {
      id: '8fa40850',
      email: 'aa',
      forced: false
    }

    const next = jest.fn()

    ValidateUser(params, next)

    expect(next).toHaveBeenCalledTimes(2)
    expect(next).toHaveBeenCalledWith(new BadRequest('"id" must be a valid GUID'))
  })
})
