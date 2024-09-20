import {
  BadRequest,
  BaseError,
  Conflict,
  InternalServerError,
  NotFound,
  Unauthorized,
} from 'src/error/CustomError'

describe('CustomError', () => {
  it('should create a new NotFound instance', () => {
    const message = 'Resource not found'
    const error = new NotFound(message)
    expect(error).toBeInstanceOf(NotFound)
    expect(error.message).toBe(message)
    expect(error.status).toBe(404)
  })


  it('should create a new Conflict instance', () => {
    const message = 'Conflict occurred'
    const error = new Conflict(message)
    expect(error).toBeInstanceOf(Conflict)
    expect(error.message).toBe(message)
  })

  it('should create a new InternalServerError instance', () => {
    const message = 'Internal server error'
    const error = new InternalServerError(message)
    expect(error).toBeInstanceOf(InternalServerError)
    expect(error.message).toBe(message)
    expect(error.status).toBe(500)
  })

  it('should create a new BaseError instance', () => {
    const error = new BaseError('Test error', 500, true)

    expect(error).toBeInstanceOf(BaseError)
    expect(error.message).toBe('Test error')
    expect(error.status).toBe(500)
    expect(error.isOperational).toBe(true)
  })

  it('should create a new BaseError instance with default isOperational value', () => {
    const error = new BaseError('Test error', 500)

    expect(error).toBeInstanceOf(BaseError)
    expect(error.message).toBe('Test error')
    expect(error.status).toBe(500)
    expect(error.isOperational).toBe(true)
  })

  it('should create a new BadRequest instance', () => {
    const message = 'Bad Request'
    const error = new BadRequest(message)
    expect(error).toBeInstanceOf(BadRequest)
    expect(error.message).toBe(message)
    expect(error.status).toBe(400)
  })

  it('should create a new Unauthorized instance', () => {
    const message = 'Unauthorized'
    const error = new Unauthorized(message)
    expect(error).toBeInstanceOf(Unauthorized)
    expect(error.message).toBe(message)
    expect(error.status).toBe(401)
  })
})
