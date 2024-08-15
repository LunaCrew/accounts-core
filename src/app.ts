import express, { Application } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'
import Log from '@lunacrew/logger'
import * as dotenv from 'dotenv'
import passport from 'passport'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { routes } from './router/routes'
import ErrorHandler from './middleware/ErrorHandler'
import configurePassport from './util/security/Passport'

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
      Log.d(`Running at http://localhost:${PORT}`, 'Server')
    })

  } catch (error) {
    Log.e(`${error}`, 'Error starting server')
  }
}

const connect = async () => {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Log.d('Connected', 'MongoDB')
  } catch (error) {
    await client.close()
    Log.e(`${error}`, 'MongoDB Connection')
  }
}

const collections = {
  users: client.db().collection('users')
}

export { collections }

start()
connect()
