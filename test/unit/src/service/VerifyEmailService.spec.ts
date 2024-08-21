import { Request, Response, NextFunction } from 'express'
import VerifyEmailService from 'src/service/VerifyEmailService'
import Log from 'src/util/log/Log'

describe('VerifyEmailService', () => {
  let req: Request
  let _res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    _res = {} as Response
    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return a query', () => {
    req.params = { id: '7a0b244d-889d-423c-9a60-2268d8b7236b', token: 'abcd1234' }
    const timestamp = new Date('2024-10-17T01:00:00.320Z').toISOString()
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(timestamp)

    const query = VerifyEmailService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      filter: { $and: [{ _id: '7a0b244d-889d-423c-9a60-2268d8b7236b' }] },
      data: {
        token: 'abcd1234',
        set: {
          $set: {
            emailVerification: {
              verified: true,
              verifiedAt: timestamp
            },
            updatedAt: timestamp
          }
        }
      }
    })
  })

  it('should call next with an error on an invalid id', () => {
    req.params = { id: '260a02988905' }

    VerifyEmailService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(2)
  })

  it('should call next with an error', () => {
    jest.spyOn(Log, 'error').mockImplementation()

    VerifyEmailService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
    expect(Log.error).toHaveBeenCalledTimes(1)
  })
})
