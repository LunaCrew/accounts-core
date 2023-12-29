import RegexExp from 'src/util/enum/RegexExp'

describe(':: Util :: Enum :: RegexExp ::', () => {
  it('should allow only display names that match the pattern', () => {
    expect('Jane'.match(RegexExp.DISPLAY_NAME)).toBeTruthy()
    expect('jane.'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('.Jane'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jan3'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('janE'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()

    expect('Jane Doe'.match(RegexExp.DISPLAY_NAME)).toBeTruthy()
    expect('Jane doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('.Jane Doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jane Doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jane doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('Jane. doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()

    expect('Jane M. Doe'.match(RegexExp.DISPLAY_NAME)).toBeTruthy()
    expect('Jane m. doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('Jane. m. doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('.Jane M. Doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jane m. Doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jane m. doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()

    expect('Jane Mary Doe'.match(RegexExp.DISPLAY_NAME)).toBeTruthy()
    expect('Jane mary doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('Jane. mary doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('.Jane Mary Doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jane mary Doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
    expect('jane mary. doe'.match(RegexExp.DISPLAY_NAME)).toBeFalsy()
  })

  it('should allow only passwords that mach the pattern', () => {
    expect('AAbbcc112233**'.match(RegexExp.PASSWORD)).toBeTruthy()
    expect('abcdfghijklmn'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('12345678'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('password'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('admin'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('qwerty'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('abc123'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('111111'.match(RegexExp.PASSWORD)).toBeFalsy()
    expect('password1'.match(RegexExp.PASSWORD)).toBeFalsy()
  })
})