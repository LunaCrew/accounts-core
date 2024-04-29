import { Router } from 'express'
import UserController from '../controller/UserController'

const userRouter: Router = Router()

userRouter.post('/api/user', UserController.createUser, userRouter)
userRouter.get('/api/user', UserController.getUser, userRouter)
userRouter.delete('/api/user/:id', UserController.deleteUser, userRouter)

export default userRouter
