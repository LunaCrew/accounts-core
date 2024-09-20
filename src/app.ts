import './util/log/Sentry'
import cors from 'cors'
import * as dotenv from 'dotenv'
import * as sentry from '@sentry/node'
import express, { Application } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import passport from 'passport'
import ErrorHandler from './middleware/ErrorHandler'
import { routes } from './router/routes'
import Log from './util/log/Log'
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
    sentry.setupExpressErrorHandler(app)
    configurePassport(passport)

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
  } catch (error) {
    Log.error('application', 'Error starting application', error)
  }
}

const connect = async () => {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Log.info('database', 'MongoDB Connected')
  } catch (error) {
    await client.close()
    Log.error('database', 'MongoDB Connection', error)
  }
}

const collections = {
  users: client.db().collection('users')
}

export { collections }

start()
connect()
