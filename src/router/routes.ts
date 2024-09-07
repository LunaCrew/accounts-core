import express, { Application, Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '../../docs/swagger.json'
import EmailController from '../controller/EmailController'
import UserController from '../controller/UserController'
import Auth from '../middleware/Auth'
import RateLimiter from '../middleware/RateLimiter'

const apiRouter: Router = Router()

const routes = (app: Application) => {
  app
    .use(express.json())
    .use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    .set('trust proxy', 1)

  app
    .get('/', (_req: Request, res: Response) => {
      res.send({ status: 'API is OK!', docs: '/api/docs' })
    })


    .post(
      '/api/user',
      RateLimiter.unauthenticated,
      UserController.createUser,
      apiRouter
    )

    .get(
      '/api/user',
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.getUser,
      apiRouter
    )

    .delete(
      '/api/user/:id',
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.deleteUser,
      apiRouter
    )

    .post(
      '/api/auth/login/:email',
      RateLimiter.unauthenticated,
      UserController.userLogin,
      apiRouter
    )

    .patch(
      '/api/user/:id',
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.updateUser,
      apiRouter
    )

    .post(
      '/api/user/:id',
      Auth.jwt,
      RateLimiter.authenticated,
      UserController.disableUser,
      apiRouter
    )

    .post(
      '/api/auth/email/validate/:id/:token',
      Auth.jwt,
      RateLimiter.authenticated,
      EmailController.sendEmailValidation,
      apiRouter
    )

    .post(
      '/api/auth/email/verify/:id',
      Auth.jwt,
      RateLimiter.authenticated,
      EmailController.sendVerificationCode,
      apiRouter
    )
}

export { routes }
