import { User, UserParams } from 'src/types/User'

describe('User type', () => {
  it('should have the correct properties', () => {
    const user: User = {
      _id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
      createdAt: '2022-01-01',
      deletedAt: null,
      settings: {
        theme: 'light',
        animations: true,
        notificationType: 'email',
        speechType: 'text-to-speech',
        mfa: true
      }
    }

    expect(user._id).toBe('1')
    expect(user.email).toBe('test@example.com')
    expect(user.name).toBe('Test User')
    expect(user.password).toBe('password')
    expect(user.createdAt).toBe('2022-01-01')
    expect(user.deletedAt).toBeNull()
    expect(user.settings.theme).toBe('light')
    expect(user.settings.animations).toBe(true)
    expect(user.settings.notificationType).toBe('email')
    expect(user.settings.speechType).toBe('text-to-speech')
    expect(user.settings.mfa).toBe(true)
  })
})

describe('UserParams type', () => {
  it('should have the correct properties', () => {
    const userParams: UserParams = {
      id: '1',
      email: 'test@xample.com'
    }

    expect(userParams.id).toBe('1')
    expect(userParams.email).toBe('test@xample.com')
  })
})
