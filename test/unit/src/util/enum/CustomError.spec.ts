import CustomErrorMessage from 'src/util/enum/CustomErrorMessage'

describe(':: Util :: Enum :: CustomError ::', () => {
  it('should return expected keys', () => {
    const enumKeys = Object.keys(CustomErrorMessage)
    const keys = ['PASSWORD', 'DATE_TIME_TIMEZONE']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(CustomErrorMessage)
    const values = [
      '"password" must have uppercase and lowercase letters, numbers and special characters',
      '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>'
    ]

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})