import JWT from 'src/util/security/JWT'

describe('JWT', () => {

})
describe('JWT', () => {
  it('should issue a JWT token', () => {
    process.env.JWT_SECRET = 'test-secret-key'

    const now = Date.now()
    jest.spyOn(Date, 'now').mockReturnValue(now)

    const userId = '863e696e-6666-48d7-8382-63bf3c4a9ed5'
    const token = JWT.generate(userId)

    expect(token).toBeDefined()
    expect(token).toEqual(expect.any(String))
  })

  it('should verify a JWT token', () => {
    process.env.JWT_SECRET = 'test-secret-key'

    const now = Date.now()
    jest.spyOn(Date, 'now').mockReturnValue(now)

    const userId = '863e696e-6666-48d7-8382-63bf3c4a9ed5'
    const token = JWT.generate(userId)

    const payload = JWT.verify(token, jest.fn())

    expect(payload).toBeDefined()
    expect(payload).toEqual(expect.objectContaining({
      userId,
      iat: now / 1000,
      exp: Math.floor(now / 1000) + (60 * 60)
    }))
  })
})
