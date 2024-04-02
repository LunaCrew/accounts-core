import { User, UserParams } from 'src/types/User'

describe('User type', () => {
  it('should have the correct properties', () => {
    const user: User = {
      _id: '1',
      email: 'test@example.com',
      username: 'testuser',
      displayName: 'Test User',
      password: 'password',
      publicKey: null,
      syncDeviceSettings: true,
      createdAt: '2022-01-01',
      deletedAt: null,
      settings: {
        theme: 'light',
        animations: true,
        notificationType: 'email',
        speechType: 'text-to-speech',
      },
      energy: {
        total: 100,
        dailyRecovery: 10,
      },
    }

    expect(user._id).toBe('1')
    expect(user.email).toBe('test@example.com')
    expect(user.username).toBe('testuser')
    expect(user.displayName).toBe('Test User')
    expect(user.password).toBe('password')
    expect(user.publicKey).toBeNull()
    expect(user.syncDeviceSettings).toBe(true)
    expect(user.createdAt).toBe('2022-01-01')
    expect(user.deletedAt).toBeNull()
    expect(user.settings.theme).toBe('light')
    expect(user.settings.animations).toBe(true)
    expect(user.settings.notificationType).toBe('email')
    expect(user.settings.speechType).toBe('text-to-speech')
    expect(user.energy.total).toBe(100)
    expect(user.energy.dailyRecovery).toBe(10)
  })
})

describe('UserParams type', () => {
  it('should have the correct properties', () => {
    const userParams: UserParams = {
      id: '1',
      email: 'test@xample.com',
      username: 'testuser',
    }

    expect(userParams.id).toBe('1')
    expect(userParams.email).toBe('test@xample.com')
    expect(userParams.username).toBe('testuser')
  })
})
