import express, { Application } from 'express'
import userRouter from './userRouter'
import Logger from '../util/log/Logger'

const routes = (app: Application) => {
  try {
    app.use(
      express.json(),
      userRouter
    )
  } catch (error) {
    Logger.error(':: Router :: Routes ::', error)
  }
}

export { routes }
