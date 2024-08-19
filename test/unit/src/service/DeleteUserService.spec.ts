import { Request, Response, NextFunction } from 'express'
import DeleteUserService from 'src/service/DeleteUserService'

describe('DeleteUserService', () => {
  let req: Request
  let _res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    _res = {} as Response
    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return a not forced query', () => {
    req.params = { id: '8fa40850-e31c-448a-9121-815b3cd5582a' }
    req.query = { forced: 'false' }

    const query = DeleteUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({ '$and': [{ '_id': '8fa40850-e31c-448a-9121-815b3cd5582a' }, { 'isDisabled': true }] })
  })

  it('should return a forced query', () => {
    req.params = { id: '8fa40850-e31c-448a-9121-815b3cd5582a' }
    req.query = { forced: 'true' }

    const query = DeleteUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({ '$and': [{ '_id': '8fa40850-e31c-448a-9121-815b3cd5582a' }] })
  })

  it('should return undefined if the user is not valid', () => {
    req.params = { id: '8fa40850' }
    req.query = { forced: 'aaaa' }

    const query = DeleteUserService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(2)
    expect(query).toBeUndefined()
  })

  it('should throw an error', () => {
    req.params = { id: '8fa40850-e31c-448a-9121-815b3cd5582a' }
  
    DeleteUserService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(1)
  })
})

