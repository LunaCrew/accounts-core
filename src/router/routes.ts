import express, { Application, Router } from 'express'
import UserController from '../controller/UserController'
import rateLimiter from '../middleware/RateLimiter'

const userRouter: Router = Router()

const routes = (app: Application) => {
  app.use(express.json())

  app
    .post('/api/user', rateLimiter, UserController.createUser, userRouter)
    .get('/api/user', rateLimiter, UserController.getUser, userRouter)
    .delete('/api/user/:id', rateLimiter, UserController.deleteUser, userRouter)
}

export { routes }
