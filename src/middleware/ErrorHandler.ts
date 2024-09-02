import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { MongoServerError } from 'mongodb'
import BaseError from '../error/BaseError'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import MongoDBError from '../util/enum/MongoDbError'
import Log from '../util/log/Log'

export default class ErrorHandler {
  /**
   * Handles errors in HTTP operations
   */
  public static readonly httpErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    switch (true) {
      case err instanceof BaseError: return this._baseError(err, res)
      case err instanceof MongoServerError: return this._mongoDbError(err, res)
      case err instanceof JsonWebTokenError: return this._unauthorizedError(err, res)
      case err instanceof SyntaxError: return this._syntaxError(err, res)
      default: {
        Log.error('error_handler', `${err.message}`, err)
        return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: err.message })
      }
    }
  }

  /**
  * Handles base error
  * @returns Response with generic error
  */
  private static readonly _baseError = (err: BaseError, res: Response) => {
    if (err.isOperational) {
      return res.status(err.status).json({
        status: 'error',
        message: err.message
      })
    } else {
      Log.error('error_handler', `${err.message}`, err)
      return res.status(err.status).json({ message: CustomErrorMessage.GENERIC })
    }
  }

  /**
   * Handles authorization errors
   * @returns Response with unauthorized error code and its message
   * @see JsonWebToken {@link https://www.npmjs.com/package/jsonwebtoken}
   * @see Firebase-SDK {@link https://www.npmjs.com/package/firebase-admin}
   */
  private static readonly _unauthorizedError = (err: Error, res: Response) => {
    Log.error('error_handler', `${err.message}`, err)
    return res.status(HttpStatus.code.UNAUTHORIZED).json({ error: err.message })
  }

  /**
   * Handles syntax errors
   * @returns Response with bad request error code and its message
   */
  private static readonly _syntaxError = (err: SyntaxError, res: Response) => {
    Log.error('error_handler', `${err.message}`, err)
    return res.status(HttpStatus.code.BAD_REQUEST).json({ error: CustomErrorMessage.BAD_REQUEST })
  }

  /**
   * Handles MongoDB errors
   * @returns Response with the error code and its message
   * @see MongoDB {@link https://www.npmjs.com/package/mongodb}
   */
  private static readonly _mongoDbError = (err: MongoServerError, res: Response) => {
    if (err.code === MongoDBError.code.DUPLICATE_KEY) {
      Log.error('error_handler', `${err.message}`, err)

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
      Log.error('error_handler', `${err.message}`, err)
      return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: CustomErrorMessage.INTERNAL_SERVER_ERROR })
    }
  }
}
