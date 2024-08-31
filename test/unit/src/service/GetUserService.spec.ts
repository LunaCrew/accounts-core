import { Request, Response, NextFunction } from 'express'
import GetUserService from 'src/service/GetUserService'
import Log from 'src/util/log/Log'

describe('GetUserService', () => {
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

  it('should return a query using id', () => {
    req.query = { id: '4768b952-3904-427c-a855-ebd729b81c85' }

    const query = GetUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }]
    })
  })

  it('should return a query using email', () => {
    req.query = { email: 'jane@example.com' }

    const query = GetUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ 'email': 'jane@example.com' }]
    })
  })


  it('should return a query using id and email', () => {
    req.query = { id: '4768b952-3904-427c-a855-ebd729b81c85', email: 'jane@example.com' }

    const query = GetUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }, { 'email': 'jane@example.com' }]
    })
  })

  it('should fail to return a query using no query parameters', () => {
    jest.spyOn(Log, 'error').mockImplementation()

    GetUserService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
    expect(Log.error).toHaveBeenCalledTimes(1)
  })
})
