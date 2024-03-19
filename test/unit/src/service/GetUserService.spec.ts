import { Request, Response } from 'express'
import GetUserService from 'src/service/GetUserService'

describe(':: Service :: GetUserService ::', () => {
  it('should return a query using id', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { id: id } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }]
    })
  })

  it('should return a query using username', () => {
    const username = 'jane'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { username: username } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ 'username': 'jane' }]
    })
  })

  it('should return a query using email', () => {
    const email = 'jane@example.com'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { email: email } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ 'email': 'jane@example.com' }]
    })
  })

  it('should return a query using username and email', () => {
    const username = 'jane'
    const email = 'jane@example.com'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { username: username, email: email } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ 'email': 'jane@example.com' }, { 'username': 'jane' }]
    })
  })

  it('should return a query using id and username', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'
    const username = 'jane'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { id: id, username: username } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }, { 'username': 'jane' }]
    })
  })

  it('should return a query using id and email', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'
    const email = 'jane@example.com'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { id: id, email: email } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }, { 'email': 'jane@example.com' }]
    })
  })

  it('should return a query using id, username and email', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'
    const username = 'jane'
    const email = 'jane@example.com'

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response
    const req = { query: { id: id, username: username, email: email } } as unknown as Request

    const query = GetUserService.execute(req)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [
        { '_id': '4768b952-3904-427c-a855-ebd729b81c85' },
        { 'email': 'jane@example.com' },
        { 'username': 'jane' }
      ]
    })
  })
})
