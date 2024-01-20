import { MongoClient, ServerApiVersion } from 'mongodb'
import express from 'express'
import Logger from './util/log/Logger'
import { routes } from './router/routes'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const PORT = process.env.PORT || 3000
const app: express.Application = express()

routes(app)

export const client = new MongoClient(process.env.DB_URI || '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function start(): Promise<void> {
  try {
    app.listen(PORT, () => {
      Logger.success(`:: Server running on port ${PORT} ::`)
    })
  } catch (error) {
    Logger.error(':: App :: Start server ::', error)
  }
}

async function connect(): Promise<void> {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Logger.success(':: Connected to MongoDB! ::')
  } catch (error) {
    await client.close()
    Logger.error(':: Database Connection ::', error)
  }
}

export const usersCollection = client.db().collection('users')

start()
connect()
