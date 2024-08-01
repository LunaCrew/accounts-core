import { Request, Response, NextFunction } from 'express'
import { MongoServerError } from 'mongodb'
import { JsonWebTokenError } from 'jsonwebtoken'
import Log from '@lunacrew/logger'
import BaseError from '../error/BaseError'
import { ValidationError } from '../error/CustomError'
import HttpStatus from '../util/enum/HttpStatus'
import MongoDBError from '../util/enum/MongoDbError'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'

class ErrorHandler {
  /**
   * Handles errors in HTTP operations
   */
  public static readonly errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    switch (true) {
      case err instanceof BaseError: return this._baseError(err, res)
      case err instanceof ValidationError: return this._validationError(res, err)
      case err instanceof MongoServerError: return this._mongoDbError(err, res)
      case err instanceof JsonWebTokenError: return this._unauthorizedError(err, res)
      case err instanceof SyntaxError: return this._syntaxError(err, res)
      case Object.getPrototypeOf(err).constructor.name.includes('Firebase'): return this._unauthorizedError(err, res)
      default: {
        Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
        return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: err.message })
      }
    }
  }

  /**
  * Handles base error
  * @param err Error to be handled
  * @param res Express response function
  * @returns Response with generic error
  */
  private static _baseError(err: BaseError, res: Response) {
    if (err.isOperational) {
      return res.status(err.status).json({
        status: err.status < HttpStatus.code.INTERNAL_SERVER_ERROR && err.status >= HttpStatus.code.BAD_REQUEST ? 'fail' : 'error',
        message: err.message
      })
    } else {
      Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
      return res.status(err.status).json({ message: CustomErrorMessage.GENERIC })
    }
  }

  /**
   * @param err Error to be handled
   * @param res Express response function
   * @returns Response with unauthorized error code and its message
   * @see JsonWebToken {@link https://www.npmjs.com/package/jsonwebtoken}
   * @see Firebase-SDK {@link https://www.npmjs.com/package/firebase-admin}
   */
  private static _unauthorizedError(err: Error, res: Response) {
    Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
    return res.status(HttpStatus.code.UNAUTHORIZED).json({ error: err.message })
  }

  /**
   * @param err Error to be handled
   * @param res Express response function
   * @returns Response with bad request error code and its message
   */
  private static _syntaxError(err: SyntaxError, res: Response) {
    Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
    return res.status(HttpStatus.code.BAD_REQUEST).json({ error: CustomErrorMessage.BAD_REQUEST })
  }

  /**
   * Handles Joi's library validations errors
   * @param res Express response function
   * @param err Error to be handled
   * @returns Response with validation error and its details
   * @see Joi {@link https://www.npmjs.com/package/joi}
   */
  private static _validationError(res: Response, err: ValidationError) {
    return res.status(err.status).json({ error: err.message, data: err.errorData })
  }

  /**
   * Handles MongoDB errors
   * @param err Error to be handled
   * @param res Express response function
   * @returns Response with the error code and its message
   * @see MongoDB {@link https://www.npmjs.com/package/mongodb}
   */
  private static _mongoDbError(err: MongoServerError, res: Response) {
    if (err.code === MongoDBError.code.DUPLICATE_KEY) {
      Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })

      switch (true) {
        case err.message.includes('email'): {
          return res.status(HttpStatus.code.CONFLICT).json({ error: CustomErrorMessage.CONFLICT_EMAIL })
        }
        case err.message.includes('id'): {
          return res.status(HttpStatus.code.CONFLICT).json({ error: CustomErrorMessage.CONFLICT_ID })
        }
        default: {
          return res.status(HttpStatus.code.CONFLICT).json({ error: CustomErrorMessage.CONFLICT })
        }
      }
    } else {
      Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
      return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: CustomErrorMessage.INTERNAL_SERVER_ERROR })
    }
  }
}

export default ErrorHandler.errorHandler
