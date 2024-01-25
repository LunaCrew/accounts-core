import express from 'express'
import UserController from '../controller/UserController'

const userRouter = express.Router()

userRouter.post('/api/user', UserController.createUser, userRouter)
userRouter.get('/api/user', UserController.getUser, userRouter)

export default userRouter
