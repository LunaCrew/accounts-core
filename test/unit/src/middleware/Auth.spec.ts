import { Request, Response } from 'express'
import Auth from 'src/middleware/Auth'

describe(':: Middleware :: Auth ::', () => {
  it('should call next with a valid Bearer token', () => {
    const req = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    } as Request
    const next = jest.fn()

    Auth.jwt(req, {} as Response, next)

    expect(next).toHaveBeenCalledWith()
  })

  it('should call next with an error on an invalid Bearer token', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    } as Request
    const next = jest.fn()

    Auth.jwt(req, {} as Response, next)

    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })

  it.skip('should call next with a valid AppCheck token', async () => {
    const req = { header: { 'X-Firebase-AppCheck': 'valid-token' } } as unknown as Request
    const next = jest.fn()

    await Auth.appCheck(req, {} as Response, next)

    expect(next).toHaveBeenCalledWith()
  })

  it.skip('should call next with an error on an invalid AppCheck token', async () => {
    const req = { header: { 'X-Firebase-AppCheck': 'invalid-token' } } as unknown as Request
    const next = jest.fn()

    await Auth.appCheck(req, {} as Response, next)

    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })
})
