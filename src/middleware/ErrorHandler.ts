import { Request, Response, NextFunction } from 'express'
import BaseError from '../error/BaseError'
import { ValidationError } from '../error/CustomError'
import Logger from '../util/log/Logger'
import HttpStatus from '../util/enum/HttpStatus'
import MongoDBError from '../util/enum/MongoDbError'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import { MongoServerError } from 'mongodb'

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  switch (true) {
    case err instanceof ValidationError: {
      return res.status(err.status).json({
        status: 'fail',
        message: err.message,
        data: err.errorData
      })
    }
    case err instanceof BaseError: {
      if (err.isOperational) {
        return res.status(err.status).json({
          status: err.status < HttpStatus.code.INTERNAL_SERVER_ERROR && err.status >= HttpStatus.code.BAD_REQUEST ? 'fail' : 'error',
          message: err.message
        })
      } else {
        Logger.error(err.message, err.stack)
        return res.status(err.status).json({
          status: 'error',
          message: CustomErrorMessage.GENERIC
        })
      }
    }
    case err instanceof MongoServerError: {
      if (err.code === MongoDBError.code.DUPLICATE_KEY) {
        Logger.error(err.message, err.stack)

        switch (true) {
          case err.message.includes('email'): {
            return res.status(HttpStatus.code.CONFLICT).json({
              status: 'fail',
              message: CustomErrorMessage.CONFLICT_EMAIL
            })
          }
          case err.message.includes('username'): {
            return res.status(HttpStatus.code.CONFLICT).json({
              status: 'fail',
              message: CustomErrorMessage.CONFLICT_USERNAME
            })
          }
          case err.message.includes('id'): {
            return res.status(HttpStatus.code.CONFLICT).json({
              status: 'fail',
              message: CustomErrorMessage.CONFLICT_ID
            })
          }
          default: {
            return res.status(HttpStatus.code.CONFLICT).json({
              status: 'fail',
              message: CustomErrorMessage.CONFLICT
            })
          }
        }
      } else {
        Logger.error(err.message, err.stack)
        return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          message: CustomErrorMessage.INTERNAL_SERVER_ERROR
        })
      }
    }
  }
}

export { errorHandler }