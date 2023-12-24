/* eslint-disable @typescript-eslint/no-explicit-any */
import colors from 'colors'

class Logger {
  static success = (message: string) => {
    console.log(colors.bgGreen.bold(message))
  }

  static info = (message: string) => {
    console.log(colors.bgBlue.bold(message))
  }

  static warning = (message: string) => {
    console.log(colors.bgYellow.bold(message))
  }

  static error = (message: string, error: any) => {
    const log = {
      error: error.name,
      description: error.message,
      details: error.stack
    }

    console.log(colors.bgRed.bold(message))
    console.log(log)
  }
}

export default Logger