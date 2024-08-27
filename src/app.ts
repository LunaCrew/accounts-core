import express, { Application } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'
import * as dotenv from 'dotenv'
import passport from 'passport'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { routes } from './router/routes'
import ErrorHandler from './middleware/ErrorHandler'
import configurePassport from './util/security/Passport'
import AutoDelete from './util/tasks/AutoDelete'
import Log from './util/log/Log'

dotenv.config({ path: '.env' })

const PORT = process.env.PORT ?? 3000
const app: Application = express()

routes(app)

export const client = new MongoClient(process.env.DB_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const start = () => {
  try {
    configurePassport(passport)
    initializeApp({
      credential: applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID
    })

    const corsOptions = {
      origin: '',
      methods: '',
      allowedHeaders: 'Content-Type'
    }

    app
      .use(cors(corsOptions))
      .use(passport.initialize())
      .use(ErrorHandler.httpErrorHandler)

    app.listen(PORT, () => {
      Log.info('application', `Running on port ${PORT}`)
    })

    AutoDelete.startCronJob()
  } catch (error) {
    Log.error('application', `Error starting application :: ${error}`)
  }
}

const connect = async () => {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Log.info('database', 'MongoDB :: Connected')
  } catch (error) {
    await client.close()
    Log.error('database', `MongoDB Connection :: ${error}`)
  }
}

const collections = {
  users: client.db().collection('users')
}

export { collections }

start()
connect()
