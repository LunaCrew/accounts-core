import { Request, Response, NextFunction } from 'express'
import Auth from 'src/middleware/Auth'

describe(':: Middleware :: Auth ::', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {
      headers: {},
    } as Request
    res = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response
    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call next with a valid Bearer token', () => {
    req.headers = {
      authorization: 'Bearer valid-token',
    }

    res.status(200)
    res.send('valid-token')

    Auth.jwt(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith('valid-token')
  })
})
