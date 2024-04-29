import { Request } from 'express'
import DeleteUserService from 'src/service/DeleteUserService'

describe('DeleteUserService', () => {
  const next = jest.fn()

  it('should return a query using id', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'
    const req = { params: { id: id } } as unknown as Request

    const query = DeleteUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }]
    })
  })

  it('should fail to return a query using no query parameters', () => {
    const req = { params: {} } as unknown as Request

    const query = DeleteUserService.execute(req, next)

    expect(query).toBeUndefined()
  })
})
