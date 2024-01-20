import express from 'express'
import UserController from 'src/controller/UserController'

const userRouter = express.Router()

userRouter.post('/api/user', UserController.createUser, userRouter)

export default userRouter