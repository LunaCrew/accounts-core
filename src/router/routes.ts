import express, { Application, Router, Request, Response } from 'express'
import UserController from '../controller/UserController'
import RateLimiter from '../middleware/RateLimiter'
import Auth from '../middleware/Auth'
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
      RateLimiter.default,
      UserController.createUser,
      userRouter
    )

    .get(
      '/api/user',
      Auth.jwt,
      RateLimiter.default,
      UserController.getUser,
      userRouter
    )

    .delete(
      '/api/user/:id',
      Auth.jwt,
      RateLimiter.default,
      UserController.deleteUser,
      userRouter
    )

    .post(
      '/api/auth/login/:id',
      RateLimiter.default,
      UserController.login,
      userRouter
    )

    .patch(
      '/api/user/:id',
      Auth.jwt,
      RateLimiter.default,
      UserController.updateUser,
      userRouter
    )

    .post(
      '/api/user/:id',
      Auth.jwt,
      RateLimiter.default,
      UserController.disableUser,
      userRouter
    )
}

export { routes }
