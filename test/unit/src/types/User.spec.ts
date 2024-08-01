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
        publicKey: null,
        backupAccount: null,
        buildVersion: 'debug'
      },
      mfa: {
        mfaToken: null,
        mfaSecret: null,
        mfaRecoveryCodes: null,
        mfaRecoveryCodesGeneratedAt: null,
        mfaRecoveryCodesUsedAt: null,
        mfaRecoveryCodesRegeneratedAt: null,
        mfaRecoveryCodesUsedCount: null
      },
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
    expect(user.settings.publicKey).toBeNull()
    expect(user.mfa.mfaToken).toBeNull()
    expect(user.mfa.mfaSecret).toBeNull()
    expect(user.mfa.mfaRecoveryCodes).toBeNull()
    expect(user.mfa.mfaRecoveryCodesGeneratedAt).toBeNull()
    expect(user.mfa.mfaRecoveryCodesUsedAt).toBeNull()
    expect(user.mfa.mfaRecoveryCodesRegeneratedAt).toBeNull()
    expect(user.mfa.mfaRecoveryCodesUsedCount).toBeNull()
    expect(user.settings.backupAccount).toBeNull()
    expect(user.settings.buildVersion).toBe('debug')
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
