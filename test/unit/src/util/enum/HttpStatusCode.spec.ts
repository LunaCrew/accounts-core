/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'src/util/enum/HttpStatus'

describe(':: Util :: Enum :: HttpStatusCode ::', () => {
  it('should have all the keys', () => {
    const expectedKeys = [
      'OK',
      'CREATED',
      'NO_CONTENT',
      'BAD_REQUEST',
      'UNAUTHORIZED',
      'FORBIDDEN',
      'NOT_FOUND',
      'CONFLICT',
      'INTERNAL_SERVER_ERROR',
      'BAD_GATEWAY',
      'SERVICE_UNAVAILABLE',
      'CONNECTION_TIMED_OUT'
    ]

    const enumKeysDeclared = Object.keys(HttpStatus.code)

    expect(expectedKeys).toEqual(enumKeysDeclared)
  })

  it('should have all the values', () => {
    const expectedValues = [
      200,
      201,
      204,
      400,
      401,
      403,
      404,
      409,
      500,
      502,
      503,
      522
    ]

    const enumValuesDeclared = Object.values(HttpStatus.code)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})