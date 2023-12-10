import enumLog from 'src/util/enum/enumLog'

describe(':: Util :: Enum ::', () => {

  it('should return expected keys', () => {
    const actualKeys = Object.keys(enumLog)
    const expectedKeys = ['SUCCESS', 'WARNING', 'ERROR']

    actualKeys.forEach((key, index) => {
      expect(key).toBe(expectedKeys[index])
    })
  })

  it('should return expected values', () => {
    const actualValues = Object.values(enumLog)
    const expectedValues = ['success', 'warning', 'error']

    actualValues.forEach((value, index) => {
      expect(value).toBe(expectedValues[index])
    })
  })
})