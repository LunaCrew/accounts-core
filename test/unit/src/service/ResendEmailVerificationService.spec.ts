import { Request, Response, NextFunction } from 'express'
import ResendEmailVerificationService from 'src/service/ResendEmailVerificationService'
import Log from 'src/util/log/Log'
import VerificationCode from 'src/util/security/VerificationCode'

describe('ResendEmailVerificationService', () => {
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
    req.params = { id: '39d36ab8-0c7b-4b7c-932e-260a02988905' }
    const timestamp = new Date('2024-10-17T01:00:00.320Z').toISOString()
    const token = 'ABCD1234'
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(timestamp)
    jest.spyOn(VerificationCode, 'generate').mockReturnValue(token)

    const query = ResendEmailVerificationService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      filter: { $and: [{ _id: '39d36ab8-0c7b-4b7c-932e-260a02988905' }] },
      data: {
        $set: {
          emailVerification: {
            verified: false,
            tokenExpiration: timestamp,
            token: token,
          },
          updatedAt: timestamp
        }
      }
    })
  })

  it('should call next with an error on an invalid id', () => {
    req.params = { id: '815b3cd5582a' }

    ResendEmailVerificationService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(2)
  })

  it('should call next with an error', () => {
    jest.spyOn(Log, 'error').mockImplementation()

    ResendEmailVerificationService.execute(req, next)
  
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
    expect(Log.error).toHaveBeenCalledTimes(1)
  })
})
