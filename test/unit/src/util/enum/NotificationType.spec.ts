import NotificationType from 'src/util/enum/NotificationType'

describe(':: Util :: Enum :: NotificationType ::', () => {
  it('should return expected keys', () => {
    const enumKeys = Object.keys(NotificationType)
    const keys = ['DEFAULT', 'SILENT', 'DIALOG']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(NotificationType)
    const values = ['default', 'silent', 'dialog']

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})
