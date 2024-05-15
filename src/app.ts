import express, { Application } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'
import Log from '@ashtrindade/logger'
import * as dotenv from 'dotenv'
import passport from 'passport'
import { routes } from './router/routes'
import { errorHandler } from './middleware/ErrorHandler'
import configurePassport from './util/security/Passport'

configurePassport(passport)
dotenv.config({ path: '.env' })

const PORT = process.env.PORT ?? 3000
const app: Application = express()

routes(app)

export const client = new MongoClient(process.env.DB_URI ?? '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const start = () => {
  try {
    const corsOptions = {
      origin: '',
      methods: '',
      allowedHeaders: 'Content-Type'
    }

    app
      .use(cors(corsOptions))
      .use(passport.initialize())
      .use(errorHandler)

    app.listen(PORT, () => {
      Log.i(`Server running on http://localhost:${PORT}`)
    })

  } catch (error) {
    Log.e(`${error}`, 'Error starting server')
  }
}

const connect = async () => {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Log.i('Database Connection', 'Connected to MongoDB!')
  } catch (error) {
    await client.close()
    Log.e('Database Connection', `${error}`)
  }
}

const collections = {
  users: client.db().collection('users')
}

export { collections }
export default app

start()
connect()
