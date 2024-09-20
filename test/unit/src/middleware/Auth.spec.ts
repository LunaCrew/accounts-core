import { Request, Response, NextFunction } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { BadRequest, Unauthorized } from 'src/error/CustomError'
import Auth from 'src/middleware/Auth'

describe(':: Middleware :: Auth ::', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {
      headers: {},
      header: jest.fn()
    } as unknown as Request

    res = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response

    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('jwt', () => {
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

    it('should call next with a invalid Bearer token', () => {
      jest.spyOn(req, 'header').mockReturnValue('dddd')

      req.headers = {
        authorization: 'Bearer invalid-token',
      }

      Auth.jwt(req, res, next)

      expect(next).toHaveBeenCalledWith(new JsonWebTokenError('jwt malformed'))
    })

    it('should call next with a non provided Bearer token', () => {
      Auth.jwt(req, res, next)

      expect(next).toHaveBeenCalledWith(new BadRequest('400 - No token provided'))
    })
  })

  describe('cron', () => {
    it('should call next with a valid cron-token', () => {
      req.headers = {
        'cron-token': 'aaaa'
      }

      Auth.cron(req, res, next)

      expect(next).toHaveBeenCalled()
    })

    it('should call next with an invalid cron-token', () => {
      jest.spyOn(req, 'header').mockReturnValue('bbbb')
      req.headers = {
        'cron-token': 'cccc'
      }

      Auth.cron(req, res, next)

      expect(next).toHaveBeenCalledWith(new Unauthorized('401 - Unauthorized'))
    })

    it('should call next with a non provided cron-token', () => {
      Auth.cron(req, res, next)

      expect(next).toHaveBeenCalledWith(new BadRequest('400 - No token provided'))
    })
  })
})
