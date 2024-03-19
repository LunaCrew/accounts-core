import { Request } from 'express'
import CreateUserService from 'src/service/CreateUserService'
import userSchema from 'src/schema/userSchema'

describe(':: Service :: CreateUserService ::', () => {
  beforeAll(() => {

  })

  it('should return a user payload', () => {
    const mockedUser = {
      displayName: 'Jane Doe',
      username: 'jane',
      email: 'jane@doe.com',
      password: 'Abcd123/*',
      settings: {},
      energy: {}
    }
    const req = { body: mockedUser } as Request
    const user = CreateUserService.execute(req)

    expect(user).toBeDefined()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('displayName')
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('settings.theme')
    expect(user).toHaveProperty('settings.animations')
    expect(user).toHaveProperty('settings.notificationType')
    expect(user).toHaveProperty('settings.speechType')
    expect(user).toHaveProperty('energy.total')
    expect(user).toHaveProperty('energy.dailyRecovery')
  })

  it('should return a bad request status', () => {
    const mockedUser = {
      displayName: 'Jane Doe',
      username: 'jane',
      email: '',
      password: 'Abcd123/*',
      settings: {},
      energy: {}
    }

    jest.spyOn(userSchema, 'validate').mockReturnValue({
      error: [{
        message: '"email" is not allowed to be empty',
        path: ['email'], type: 'string.empty',
        context: { value: '', key: 'email', label: 'email' }
      }]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown as any)

    const req = { body: mockedUser } as Request

    CreateUserService.execute(req)

    expect(userSchema.validate).toHaveBeenCalledWith(mockedUser)
  })
})
