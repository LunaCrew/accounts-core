import HttpStatusCode from 'src/util/enum/HttpStatusCode'

describe(':: Util :: Enum :: HttpStatusCode ::', () => {
  it('should return expected keys', () => {
    const enumKeys = Object.keys(HttpStatusCode)
    const keys = ['OK', 'CREATED', 'NO_CONTENT', 'BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 'CONFLICT', 'INTERNAL_SERVER_ERROR', 'BAD_GATEWAY', 'SERVICE_UNAVAILABLE', 'CONNECTION_TIMED_OUT']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(HttpStatusCode)
    const values = ['200', '201', '204', '400', '401', '403', '404', '409', '500', '502', '503', '522']

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})