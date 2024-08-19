import { Request, Response, NextFunction } from 'express'
import LoginService from 'src/service/LoginService'

describe('LoginService', () => {
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
    req.params = { id: '8fa40850-e31d-448f-9120-815b3cd5582a' }
    const mockedDate = new Date('2024-08-17T01:47:46.320Z').toISOString()
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockedDate)

    const query = LoginService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({ 
      filter: { $and: [{ _id: '8fa40850-e31d-448f-9120-815b3cd5582a' }] }, 
      data: { 
        $set: { 
          disabledAt: null,
          expiresIn: null,
          isDisabled: false,
          updatedAt: mockedDate
        }
      } 
    })
  })

  it('should call next with an error', () => {
    req.params = { id: '8fa40850' }

    const next = jest.fn()

    LoginService.execute(req, next)

    expect(next).toHaveBeenCalledWith(new Error('400 - Bad Request'))
  })
})
