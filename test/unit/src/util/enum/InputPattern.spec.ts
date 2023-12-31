import InputPattern from 'src/util/enum/InputPattern'

describe(':: Util :: Enum :: RegexExp ::', () => {
  it('should allow only passwords that mach the pattern', () => {
    expect('Abcd123*'.match(InputPattern.PASSWORD)).toBeTruthy()
    expect('aaaaaaaa'.match(InputPattern.PASSWORD)).toBeFalsy()
    expect('AAAAAAAA'.match(InputPattern.PASSWORD)).toBeFalsy()
    expect('12345678'.match(InputPattern.PASSWORD)).toBeFalsy()
    expect('********'.match(InputPattern.PASSWORD)).toBeFalsy()
    expect('Aaaaaaaa'.match(InputPattern.PASSWORD)).toBeFalsy()
    expect('A1aaaaaa'.match(InputPattern.PASSWORD)).toBeFalsy()
  })

  it('should allow only dates that mach the iso pattern', () => {
    expect('2023-12-31T15:23:45-0300'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeTruthy()
    expect('2023-12-31T15:23:45Z'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeTruthy()
    expect('2023-12-31T15:23:45z'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeTruthy()
    expect('2023-12-31T15:23:45-03:00'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023-12-31T15:23:45-03:00:00'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023-12-31T15:23:45'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023-12-31T15:23'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023-12-31T15'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023-12-31T'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023-12-31'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('2023/12/31'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023T'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023T15'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023T15:23'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023T15:23:00'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023T15:23:00-03:00:00'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
    expect('31/12/2023T15:23:00-03:00'.match(InputPattern.DATE_TIME_TIMEZONE)).toBeFalsy()
  })
})