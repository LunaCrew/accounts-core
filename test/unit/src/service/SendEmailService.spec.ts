import { NextFunction, Request, Response } from 'express'
import SendEmailService from 'src/service/SendEmailService'
import Log from 'src/util/log/Log'
import VerificationCode from 'src/util/security/VerificationCode'

describe('SendEmailService', () => {
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

  it('should return a query for email validation', () => {
    req.params = { id: '39d36ab8-0c7b-4b7c-932e-260a02988905' }
    req.query = { isEmailValidation: 'true' }

    const timestamp = new Date('2024-10-17T01:00:00.320Z').toISOString()
    const token = 'ABCD1234'

    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(timestamp)
    jest.spyOn(VerificationCode, 'generate').mockReturnValue(token)

    const query = SendEmailService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      filter: { $and: [{ _id: '39d36ab8-0c7b-4b7c-932e-260a02988905' }] },
      token: token,
      data: {
        $set: {
          emailStatus: {
            validated: false,
            tokenExpiration: timestamp,
            token: token,
          },
          updatedAt: timestamp
        }
      }
    })
  })

  it('should return a query for general validation', () => {
    req.params = { id: 'dae65cd1-5b70-4e49-8f2b-a1879924f260' }
    req.query = { isEmailValidation: 'false' }

    const timestamp = new Date('2023-11-18T01:00:00.320Z').toISOString()
    const token = '1234ABCD'

    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(timestamp)
    jest.spyOn(VerificationCode, 'generate').mockReturnValue(token)

    const query = SendEmailService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      filter: { $and: [{ _id: 'dae65cd1-5b70-4e49-8f2b-a1879924f260' }] },
      token: token,
      data: {
        $set: {
          verificationData: {
            token: token,
            tokenExpiration: timestamp
          },
          updatedAt: timestamp
        }
      }
    })
  })

  it('should call next with an error on an invalid id', () => {
    req.params = { id: '815b3cd5582a' }
    req.query = {}

    jest.spyOn(Log, 'error').mockImplementation()

    SendEmailService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(2)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should call next with an error on an invalid query', () => {
    req.params = { id: '815b3cd5582a' }
  
    jest.spyOn(Log, 'error').mockImplementation()
  
    SendEmailService.execute(req, next)
  
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
    expect(Log.error).toHaveBeenCalledTimes(1)
  })
})
