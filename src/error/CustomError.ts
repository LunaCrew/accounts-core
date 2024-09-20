import HttpStatus from '../util/enum/HttpStatus'
import { MongoServerError } from 'mongodb'

export class BaseError extends Error {
  status: number
  isOperational: boolean

  constructor(message: string, status: number, isOperational: boolean = true) {
    super(message)
    this.status = status
    this.isOperational = isOperational
    Object.setPrototypeOf(this, BaseError.prototype)
  }
}

export class NotFound extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.code.NOT_FOUND)
    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

export class Conflict extends MongoServerError {
  constructor(message: string) {
    super({ message })
    Object.setPrototypeOf(this, Conflict.prototype)
  }
}

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.code.BAD_REQUEST)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.code.INTERNAL_SERVER_ERROR)
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }
}

export class Unauthorized extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.code.UNAUTHORIZED)
    Object.setPrototypeOf(this, Unauthorized.prototype)
  }
}
