import LogType from 'src/util/enum/LogType'

describe(':: Util :: Enum :: LogType ::', () => {

  it('should return expected keys', () => {
    const actualKeys = Object.keys(LogType)
    const expectedKeys = ['SUCCESS', 'WARNING', 'ERROR']

    actualKeys.forEach((key, index) => {
      expect(key).toBe(expectedKeys[index])
    })
  })

  it('should return expected values', () => {
    const actualValues = Object.values(LogType)
    const expectedValues = ['success', 'warning', 'error']

    actualValues.forEach((value, index) => {
      expect(value).toBe(expectedValues[index])
    })
  })
})
