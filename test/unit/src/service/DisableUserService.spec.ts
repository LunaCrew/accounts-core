import { Request, Response, NextFunction } from 'express'
import DisableUserService from 'src/service/DisableUserService'
import Log from 'src/util/log/Log'

describe('DisableUserService', () => {
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
    req.params = { id: '8fa40850-e31c-448a-9121-815b3cd5582a' }
    const timestamp = new Date('2024-09-17T01:47:46.320Z').toISOString()
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(timestamp)

    const query = DisableUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({ 
      filter: { $and: [{ _id: '8fa40850-e31c-448a-9121-815b3cd5582a' }] }, 
      data: { 
        $set: { 
          disabledAt: timestamp,
          expiresIn: timestamp,
          isDisabled: true,
          updatedAt: timestamp
        }
      } 
    })
  })

  it('should call next with an error', () => {
    jest.spyOn(Log, 'error').mockImplementation()

    DisableUserService.execute(req, next)
  
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
    expect(Log.error).toHaveBeenCalledTimes(1)
  })
})
