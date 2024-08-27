import express, { Application, Router, Request, Response } from 'express'
import UserController from '../controller/UserController'
import EmailController from '../controller/EmailController'
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
      Auth.appCheck,
      RateLimiter.unauthenticated,
      UserController.createUser,
      userRouter
    )

    .get(
      '/api/user',
      Auth.appCheck,
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.getUser,
      userRouter
    )

    .delete(
      '/api/user/:id',
      Auth.appCheck,
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.deleteUser,
      userRouter
    )

    .post(
      '/api/auth/login/:email',
      Auth.appCheck,
      RateLimiter.default,
      UserController.userLogin,
      userRouter
    )

    .patch(
      '/api/user/:id',
      Auth.appCheck,
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.updateUser,
      userRouter
    )

    .post(
      '/api/user/:id',
      Auth.appCheck,
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.disableUser,
      userRouter
    )

    .post(
      '/api/auth/email/validate/:id/:token',
      Auth.appCheck,
      Auth.jwt,
      RateLimiter.authenticated,
      EmailController.sendEmailValidation,
      userRouter
    )

    .post(
      '/api/auth/email/:id',
      Auth.appCheck,
      Auth.jwt,
      RateLimiter.authenticated,
      EmailController.sendVerificationCode,
      userRouter
    )
}

export { routes }
