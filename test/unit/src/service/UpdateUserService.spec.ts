import { Request, NextFunction } from 'express'
import { BadRequest } from 'src/error/CustomError'
import UpdateUserService from 'src/service/UpdateUserService'

describe('UpdateUserService', () => {
  const next: NextFunction = jest.fn()

  beforeEach(() => {
    jest.spyOn(global.Date.prototype, 'toISOString').mockReturnValue('2024-07-13T13:33:37.174Z')
  })

  describe('execute', () => {
    it('should return filter and data', () => {
      const req = {
        params: {
          id: '12bac64a-8a30-4e30-8b4d-41ea3dd439ac',
        },
        body: {
          name: 'John'
        },
      } as unknown as Request

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
      const req = {
        params: {
          id: '1',
        },
        body: {},
      } as unknown as Request
      const next: NextFunction = jest.fn()

      UpdateUserService.execute(req, next)

      expect(next).toHaveBeenCalledWith(new BadRequest('400 - Bad Request'))
    })
  })

  describe('_buildData', () => {
    it('should return data when validation passes', () => {
      const req = {
        body: {
          name: 'John'
        },
      } as unknown as Request
      const next: NextFunction = jest.fn()

      const result = UpdateUserService['_buildData'](req, next)

      const expectResult = {
        $set: { name: 'John', updatedAt: new Date().toISOString() }
      }

      expect(result).toBeDefined()
      expect(result).toEqual(expectResult)
    })

    it('should call next with validation error when validation fails', () => {
      const req = {
        body: {},
      } as unknown as Request
      const next: NextFunction = jest.fn()

      UpdateUserService['_buildData'](req, next)

      expect(next).toHaveBeenCalledWith(new BadRequest('400 - Bad Request'))
    })
  })
})
