import express from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'
import { routes } from './router/routes'
import Logger from './util/log/Logger'

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

const start = () => {
  try {
    app.listen(PORT, () => {
      Logger.success(`:: Server running on port ${PORT} ::`)
    })
  } catch (error) {
    Logger.error(':: App :: Start server ::', error)
  }
}

const connect = async () => {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Logger.success(':: Connected to MongoDB! ::')
  } catch (error) {
    await client.close()
    Logger.error(':: Database Connection ::', error)
  }
}

const usersCollection = client.db().collection('users')
const notesCollection = client.db().collection('notes')
const actionsCollection = client.db().collection('actions')
export { usersCollection, notesCollection, actionsCollection }
export default app

start()
connect()
