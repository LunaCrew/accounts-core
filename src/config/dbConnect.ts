import { connect } from 'mongoose'
import logMessage from 'src/util/log/logMessage'
import LogType from 'src/util/enum/LogType'

const connectDatabase = async () => {
  try {
    await connect(process.env.DB_URI || '')
    logMessage(LogType.SUCCESS, 'MongoDB connected')
  } catch (error) {
    logMessage(LogType.ERROR, 'Connection error! Try again')
  }
}

export default connectDatabase
