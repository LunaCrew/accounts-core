/* eslint-disable @typescript-eslint/no-explicit-any */
import colors from 'colors'

class Logger {
  static success = (message: string) => {
    console.log(colors.bgGreen.bold(message), '\n')
  }

  static info = (message: string) => {
    console.log(colors.bgBlue.bold(message), '\n')
  }

  static warning = (message: string) => {
    console.log(colors.bgYellow.bold(message), '\n')
  }

  static error = (message: string, error: any) => {
    const log = {
      error: error.name,
      description: error.message,
      details: error.stack
    }

    console.log(colors.bgRed.bold(message), '\n')
    console.log(log)
  }
}

export default Logger