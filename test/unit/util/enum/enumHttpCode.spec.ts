import enumHttpCode from 'src/util/enum/enumHttpCode'

describe.only(':: Util :: Enum ::', () => {
  it('should return expected keys', () => {
    const actualKeys = Object.keys(enumHttpCode)
    const expectedKeys = [
      'OK',
      'CREATED',
      'BAD_REQUEST',
      'UNAUTHORIZED',
      'FORBIDEN',
      'NOT_FOUND',
      'CONFLICT',
      'UNPROCESSABLE_ENTITY',
      'INTERNAL_ERROR',
      'BAD_GATEWAY',
      'SERVICE_UNAVAILABLE',
      'TIME_OUT'
    ]

    actualKeys.forEach((key, index) => {
      expect(key).toBe(expectedKeys[index])
    })
  })

  it('should return expected values', () => {
    const actualValues = Object.values(enumHttpCode)
    const expectedValues = [
      '200',
      '201',
      '400',
      '401',
      '403',
      '404',
      '409',
      '422',
      '500',
      '502',
      '503',
      '522'
    ]

    actualValues.forEach((value, index) => {
      expect(value).toBe(expectedValues[index])
    })
  })
})