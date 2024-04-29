import crypto from 'crypto'
import Password from 'src/util/security/Password'

describe(':: Util :: Log :: Password ::', () => {
  it('should encrypt the password correctly', () => {
    const password = 'testPassword'
    const expectedHash = crypto.createHash('sha256').update(password).digest('hex')
    const result = Password.encrypt(password)
    expect(result).toEqual(expectedHash)
  })

  it('should validate the password correctly', () => {
    const password = 'testPassword'
    const hashedPassword = Password.encrypt(password)
    const isValid = Password.validate(hashedPassword, password)
    expect(isValid).toBe(true)
  })

  it('should return false when the password is incorrect', () => {
    const password = 'testPassword'
    const incorrectPassword = 'incorrectPassword'
    const hashedPassword = Password.encrypt(password)
    const isValid = Password.validate(hashedPassword, incorrectPassword)
    expect(isValid).toBe(false)
  })
})
