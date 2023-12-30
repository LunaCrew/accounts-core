import ActionType from 'src/util/enum/ActionType'

describe(':: Util :: Enum :: ActionType ::', () => {
  it('should return expected keys', () => {
    const enumKeys = Object.keys(ActionType)
    const keys = ['BUTTON', 'REMINDER', 'TIMER']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(ActionType)
    const values = ['button', 'reminder', 'timer']

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})