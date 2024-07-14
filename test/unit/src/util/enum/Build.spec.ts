import Build from 'src/util/enum/Build'

describe(':: Util :: Enum :: Build ::', () => {
  it('should have the correct keys', () => {
    const expectedKeys = [
      'DEBUG',
      'BETA',
      'RELEASE'
    ]

    const enumKeysDeclared = Object.keys(Build)

    expect(expectedKeys).toEqual(enumKeysDeclared)
  })

  it('should have the correct values', () => {
    const expectedValues = [
      'debug',
      'beta',
      'release'
    ]

    const enumValuesDeclared = Object.values(Build)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})
