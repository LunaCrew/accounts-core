import LogType from 'src/util/enum/LogType'

describe(':: Util :: Enum :: LogType ::', () => {

  it('should return expected keys', () => {
    const enumKeys = Object.keys(LogType)
    const keys = ['SUCCESS', 'WARNING', 'ERROR']

    enumKeys.forEach((key, index) => {
      expect(key).toBe(keys[index])
    })
  })

  it('should return expected values', () => {
    const enumValues = Object.values(LogType)
    const values = ['success', 'warning', 'error']

    enumValues.forEach((value, index) => {
      expect(value).toBe(values[index])
    })
  })
})
