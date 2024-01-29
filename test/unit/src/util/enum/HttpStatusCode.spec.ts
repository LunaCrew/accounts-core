/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatusCode from 'src/util/enum/HttpStatusCode'

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

    const enumKeysDeclared = Object.keys(HttpStatusCode).filter((key: any) => isNaN(key))

    expect(expectedKeys.length).toEqual(enumKeysDeclared.length)
    expectedKeys.forEach((key, index) => {
      expect(key).toEqual(enumKeysDeclared[index])
    })
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

    const enumValuesDeclared = Object.values(HttpStatusCode).filter((key: any) => !isNaN(key))
    expect(expectedValues.length).toEqual(enumValuesDeclared.length)
    expectedValues.forEach((value, index) => {
      expect(value).toEqual(enumValuesDeclared[index])
    })
  })
})