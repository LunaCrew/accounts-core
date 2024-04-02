import express, { Application } from 'express'
import { routes } from 'src/router/routes'
import userRouter from 'src/router/userRouter'

describe('routes', () => {
  let app: Application

  beforeEach(() => {
    app = express()
  })

  it('should register userRouter', () => {
    routes(app)

    expect(app.use).toHaveBeenCalledWith('/users', userRouter)
  })
})
