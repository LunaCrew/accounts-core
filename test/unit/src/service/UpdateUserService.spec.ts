import { Request, Response, NextFunction } from 'express'
import { BadRequest } from 'src/error/CustomError'
import UpdateUserService from 'src/service/UpdateUserService'
import Log from 'src/util/log/Log'

describe('UpdateUserService', () => {
  let req: Request
  let _res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    _res = {} as Response
    next = jest.fn()
    jest.spyOn(global.Date.prototype, 'toISOString').mockReturnValue('2024-07-13T13:33:37.174Z')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('execute', () => {
    it('should return filter and data', () => {
      req.params = { id: '12bac64a-8a30-4e30-8b4d-41ea3dd439ac' }
      req.body = { name: 'John' }

      const result = UpdateUserService.execute(req, next)

      const expectResult = {
        data: {
          $set: { name: 'John', updatedAt: new Date().toISOString() }
        },
        filter: {
          $and: [
            { _id: '12bac64a-8a30-4e30-8b4d-41ea3dd439ac' }
          ]
        }
      }

      expect(result).toBeDefined()
      expect(result).toEqual(expectResult)
    })

    it('should log error when an exception occurs', () => {
      req.params = { id: '1' }

      UpdateUserService.execute(req, next)

      expect(next).toHaveBeenCalledWith(new BadRequest('"id" must be a valid GUID'))
    })

    it('should call next with an error', () => {
      jest.spyOn(Log, 'error').mockImplementation()

      UpdateUserService.execute(req, next)

      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
      expect(Log.error).toHaveBeenCalledTimes(1)
    })
  })

  describe('_buildData', () => {
    it('should return data when validation passes', () => {
      req.body = { name: 'John' }

      const result = UpdateUserService['_buildData'](req, next)

      const expectResult = {
        $set: { name: 'John', updatedAt: new Date().toISOString() }
      }

      expect(result).toBeDefined()
      expect(result).toEqual(expectResult)
    })

    it('should call next with validation error when validation fails', () => {
      req.body = {}

      UpdateUserService['_buildData'](req, next)

      expect(next).toHaveBeenCalledWith(new BadRequest('"value" must contain at least one of [name, email, password, settings]'))
    })

    it('should call next with an error', () => {
      req.params = { id: '2b7d1e3e-1736-43a4-ac4c-814f01efcfd6' }
      req.body = { password: '814f01efcfd6' }

      const user = UpdateUserService.execute(req, next)

      expect(user).toBeDefined()
    })
  })
})
