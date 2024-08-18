import { Request, Response, NextFunction } from 'express'
import DisableUserService from 'src/service/DisableUserService'

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
    const mockedDate = new Date('2024-09-17T01:47:46.320Z').toISOString()
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockedDate)

    const query = DisableUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({ 
      filter: { $and: [{ _id: '8fa40850-e31c-448a-9121-815b3cd5582a' }] }, 
      data: { 
        $set: { 
          disabledAt: mockedDate,
          expiresIn: mockedDate,
          isDisabled: true,
          updatedAt: mockedDate
        }
      } 
    })
  })

  it('should call next with an error', () => {
    req.params = { id: '8fa40850' }

    DisableUserService.execute(req, next)
  
    expect(next).toHaveBeenCalledTimes(2)
  })
})
