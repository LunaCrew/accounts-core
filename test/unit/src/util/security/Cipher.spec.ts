import { NextFunction } from 'express'
import { BadRequest } from 'src/error/CustomError'
import Cipher from 'src/util/security/Cipher'

describe('Cipher', () =>{
  let next: NextFunction

  beforeEach(() => {
    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const sample = 'user-name_12+alias@example.com'

  it('should encode and decode', () => {
    const encoded = Cipher.encode(sample, next)
    console.log(encoded)
    const decoded = Cipher.decode(encoded as string, next)

    expect(decoded).toEqual(sample)
  })

  it('should call next with a BadRequest', () => {
    Cipher.decode('string', next)

    expect(next).toHaveBeenCalledWith(new BadRequest('Invalid token'))
  })

  it('should call next with an error', () => {
    Cipher.encode(undefined as unknown as string, next)

    expect(next).toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(2)
  })
})
