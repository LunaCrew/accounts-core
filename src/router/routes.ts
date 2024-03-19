import express, { Application } from 'express'
import userRouter from './userRouter'

const routes = (app: Application) => {
  app.use(
    express.json(),
    userRouter
  )
}

export { routes }
