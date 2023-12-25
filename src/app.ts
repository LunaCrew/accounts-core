import { connect } from 'mongoose'
import express, { Request, Response } from 'express'
import Logger from './util/log/Logger'
import HttpStatusCode from './util/enum/HttpStatusCode'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const PORT = process.env.PORT || 3000
const app: express.Application = express()

try {
  app.get('/', (_req: Request, res: Response) => {
    res.status(parseInt(HttpStatusCode.OK)).json({
      server: 'Luna App',
      status: 'OK'
    })
  })
} catch (error) {
  Logger.error(':: App :: Base URL ::', error)
}

try {
  app.listen(PORT, () => {
    Logger.success(`:: Server runing on port ${PORT} ::`)
  })
} catch (error) {
  Logger.error(':: App :: Start server ::', error)
}

try {
  connect(process.env.DB_URI || '', { dbName: 'lunateam-dev' })
  Logger.success(':: Database connected with success ::')
} catch (error) {
  Logger.error(':: Config :: DbConnect ::', error)
}
