import enumLanguage from 'src/util/enum/enumLanguage'

describe.only(':: Util :: Enum ::', () => {
  it('should return expected keys', () => {
    const actualKeys = Object.keys(enumLanguage)
    const expectedKeys = [
      'PT_BR',
      'EN_US',
      'ES_AR',
      'ES_BO',
      'ES_CL',
      'ES_CO',
      'ES_EC',
      'ES_GF',
      'ES_GY',
      'ES_PY',
      'ES_PE',
      'ES_SR',
      'ES_UY',
      'ES_VE'
    ]

    actualKeys.forEach((key, index) => {
      expect(key).toBe(expectedKeys[index])
    })
  })

  it('should return expected values', () => {
    const actualValues = Object.values(enumLanguage)
    const expectedValues = [
      'pt_br',
      'en_us',
      'es_ar',
      'es_bo',
      'es_cl',
      'es_co',
      'es_ec',
      'es_gf',
      'es_gy',
      'es_py',
      'es_pe',
      'es_sr',
      'es_uy',
      'es_ve'
    ]

    actualValues.forEach((value, index) => {
      expect(value).toBe(expectedValues[index])
    })
  })
})