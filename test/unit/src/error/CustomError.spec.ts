import { NotFound, Conflict, InternalServerError } from 'src/error/CustomError'

describe('CustomError', () => {
  it('should create a new NotFound instance', () => {
    const message = 'Resource not found'
    const error = new NotFound(message)
    expect(error).toBeInstanceOf(NotFound)
    expect(error.message).toBe(message)
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
  })
})
