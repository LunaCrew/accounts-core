import { Request, NextFunction } from 'express'
import CreateUserService from 'src/service/CreateUserService'
import { userCreate } from 'src/schema/userSchema'

describe('CreateUserService', () => {
  let req: Request
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return a user payload', () => {
    const mockedUser = {
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'Abcd123/*',
      settings: {
      }
    }
    req.body = mockedUser
    const user = CreateUserService.execute(req, next)

    console.log(user)
    expect(user).toBeDefined()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('settings.theme')
    expect(user).toHaveProperty('settings.animations')
    expect(user).toHaveProperty('settings.notificationType')
    expect(user).toHaveProperty('settings.speechType')
    expect(user).toHaveProperty('settings.language')
    expect(user).toHaveProperty('settings.mfa')
    expect(user).toHaveProperty('emailStatus')
    expect(user).toHaveProperty('emailStatus.validated')
    expect(user).toHaveProperty('emailStatus.token')
    expect(user).toHaveProperty('emailStatus.tokenExpiration')
  })

  it('should return a bad request status', () => {
    const mockedUser = {
      name: 'Jane Doe',
      email: '',
      password: 'Abcd123/*',
      settings: {
      }
    }

    jest.spyOn(userCreate, 'validate').mockReturnValue({
      error: {
        details: [{
          message: '"email" is not allowed to be empty',
          path: ['email'],
          type: 'string.empty',
          context: { value: '', key: 'email', label: 'email' }
        }]
      }
    } as never)

    req.body = mockedUser

    CreateUserService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(2)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should call next with an error', () => {
    const mockedUser = {
      name: 'Jane Doe',
      email: '',
      password: 'Abcd123/*',
      settings: {}
    }

    jest.spyOn(userCreate, 'validate').mockReturnValue({
      error: [{
        message: '"email" is not allowed to be empty',
        path: ['email'],
        type: 'string.empty',
        context: { value: '', key: 'email', label: 'email' }
      }]
    } as never)

    req.body = mockedUser

    CreateUserService.execute(req, next)

    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })
})
