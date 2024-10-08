import CustomErrorMessage from 'src/util/enum/CustomErrorMessage'

describe(':: Util :: Enum :: CustomErrorMessage ::', () => {
  it('should have all the keys', () => {
    const expectedKeys = [
      'BAD_REQUEST',
      'LOGIN_FAILED',
      'AUTH_NOT_PROVIDED',
      'USER_ALREADY_DISABLED',
      'USER_ALREADY_VERIFIED',
      'INVALID_TOKEN',
      'UNAUTHORIZED',
      'FORBIDDEN',
      'NOT_FOUND',
      'CONFLICT',
      'CONFLICT_EMAIL',
      'CONFLICT_ID',
      'INTERNAL_SERVER_ERROR',
      'SERVICE_UNAVAILABLE',
      'GENERIC'
    ]

    const enumKeysDeclared = Object.keys(CustomErrorMessage)

    expect(expectedKeys).toEqual(enumKeysDeclared)
  })

  it('should have all the values', () => {
    const expectedValues = [
      '400 - Bad Request',
      '400 - Login Failed - Invalid Credentials',
      '400 - No token provided',
      '400 - User already disabled',
      '400 - User already verified',
      '400 - Invalid Token',
      '401 - Unauthorized',
      '403 - Forbidden',
      '404 - User Not Found',
      '409 - Conflict',
      '409 - Email Already in Use',
      '409 - Id Already in Use',
      '500 - Internal Server Error',
      '503 - Service Unavailable',
      'Something went wrong'
    ]

    const enumValuesDeclared = Object.values(CustomErrorMessage)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})
