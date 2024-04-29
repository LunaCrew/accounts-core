import CustomErrorMessage from 'src/util/enum/CustomErrorMessage'

describe(':: Util :: Enum :: CustomErrorMessage ::', () => {
  it('should have all the keys', () => {
    const expectedKeys = [
      'PASSWORD',
      'DATE_TIME_TIMEZONE',
      'VALIDATION',
      'NOT_FOUND',
      'CONFLICT',
      'CONFLICT_EMAIL',
      'CONFLICT_USERNAME',
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
      '"password" must have uppercase and lowercase letters, numbers and special characters',
      '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>',
      'Validation Error',
      'User Not Found',
      'User Already Exists',
      'Email Already in Use',
      'Username Already in Use',
      'ID Already in Use',
      'Internal Server Error',
      'Service Unavailable',
      'Something went wrong'
    ]

    const enumValuesDeclared = Object.values(CustomErrorMessage)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})
