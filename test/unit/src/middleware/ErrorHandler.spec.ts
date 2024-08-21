import { Request, Response, NextFunction } from 'express'
import { MongoServerError } from 'mongodb'
import ErrorHandler from 'src/middleware/ErrorHandler'
import BaseError from 'src/error/BaseError'
import HttpStatus from 'src/util/enum/HttpStatus'
import { JsonWebTokenError } from 'jsonwebtoken'

describe('errorHandler', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
    next = jest.fn() as NextFunction
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle BaseError', () => {
    const error = new BaseError('Test error', HttpStatus.code.BAD_REQUEST)
    ErrorHandler.httpErrorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: 'Test error', status: 'fail' })
  })

  it('should handle MongoDBError', () => {
    const error = new MongoServerError({ message: 'MongoDB error', code: 11000 })
    ErrorHandler.httpErrorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.CONFLICT)
    expect(res.json).toHaveBeenCalledWith({ error: '409 - Conflict' })
  })

  it('should handle SyntaxError', () => {
    const error = new SyntaxError('Syntax error')
    ErrorHandler.httpErrorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: '400 - Bad Request' })
  })

  it('should handle JsonWebTokenError', () => {
    const error = new JsonWebTokenError('Expired token')
    ErrorHandler.httpErrorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.UNAUTHORIZED)
    expect(res.json).toHaveBeenCalledWith({ error: 'Expired token' })
  })

  it('should handle unknown error', () => {
    const error = new Error('Unknown error')
    ErrorHandler.httpErrorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: 'Unknown error' })
  })
})
