import { Router } from 'express'
import UserController from '../controller/UserController'
import rateLimiter from '../middleware/RateLimiter'

const userRouter: Router = Router()

userRouter.post('/api/user', rateLimiter, UserController.createUser, userRouter)
userRouter.get('/api/user', rateLimiter, UserController.getUser, userRouter)
userRouter.delete('/api/user/:id', rateLimiter, UserController.deleteUser, userRouter)

export default userRouter
