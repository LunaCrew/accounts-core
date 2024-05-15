import express, { Application, Router, Request, Response } from 'express'
import passport from 'passport'
import UserController from '../controller/UserController'
import rateLimiter from '../middleware/RateLimiter'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '../../docs/swagger.json'

const userRouter: Router = Router()

const routes = (app: Application) => {
  app
    .use(express.json())
    .use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app
    .get('/', (_req: Request, res: Response) => {
      res.send({ status: 'API is OK!', docs: '/api/docs' })
    })

    .post(
      '/api/user',
      rateLimiter,
      UserController.createUser,
      userRouter
    )

    .get(
      '/api/user',
      passport.authenticate('jwt', { session: false }),
      UserController.getUser,
      userRouter
    )

    .delete(
      '/api/user/:id',
      passport.authenticate('jwt', { session: false }),
      UserController.deleteUser,
      userRouter
    )

    .post(
      '/api/auth/login',
      rateLimiter,
      UserController.login,
      userRouter
    )
}

export { routes }
