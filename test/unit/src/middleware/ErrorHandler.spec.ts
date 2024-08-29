import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { MongoServerError } from 'mongodb'
import BaseError from 'src/error/BaseError'
import ErrorHandler from 'src/middleware/ErrorHandler'
import HttpStatus from 'src/util/enum/HttpStatus'
import Log from 'src/util/log/Log'

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

  describe('BaseError', () => {
    it('should handle BaseError', () => {
      const error = new BaseError('Test error', HttpStatus.code.BAD_REQUEST)
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error', status: 'fail' })
    })
  
    it('should handle an non operational error', () => {
      const error = new BaseError('Test error', HttpStatus.code.INTERNAL_SERVER_ERROR, false)
      jest.spyOn(Log, 'error').mockImplementation()
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' })
      expect(Log.error).toHaveBeenCalledTimes(1)
      expect(Log.error).toHaveBeenCalledWith('error_handler', error.stack)
    })
  })

  describe('MongoServerError', () => {
    it('should handle MongoDBError', () => {
      const error = new MongoServerError({ message: 'MongoDB error', code: 11000 })
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.CONFLICT)
      expect(res.json).toHaveBeenCalledWith({ error: '409 - Conflict' })
    })
  
    it('should handle MongoServerError with duplicate key email', () => {
      const error = new MongoServerError({ code: 11000, errmsg: 'email already exists' })
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.CONFLICT)
      expect(res.json).toHaveBeenCalledWith({ error: '409 - Email Already in Use' })
    })
  
    it('should handle MongoServerError with duplicate key id', () => {
      const error = new MongoServerError({ code: 11000, errmsg: 'id already exists' })
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.CONFLICT)
      expect(res.json).toHaveBeenCalledWith({ error: '409 - Id Already in Use' })
    })
  
    it('should handle MongoServerError with internal server error', () => {
      const error = new MongoServerError({ code: 1 })
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith({ error: '500 - Internal Server Error' })
    })
  })

  describe('Error', () => {
    it('should handle unknown error', () => {
      const error = new Error('Unknown error')
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith({ error: 'Unknown error' })
    })

    it('should handle SyntaxError', () => {
      const error = new SyntaxError('Syntax error')
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith({ error: '400 - Bad Request' })
    })
  })

  describe('UnauthorizedError', () => {
    it('should handle JsonWebTokenError', () => {
      const error = new JsonWebTokenError('Expired token')
  
      ErrorHandler.httpErrorHandler(error, req, res, next)
  
      expect(res.status).toHaveBeenCalledWith(HttpStatus.code.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith({ error: 'Expired token' })
    })
  })
})
