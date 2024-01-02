/* eslint-disable @typescript-eslint/no-explicit-any */
import colors from 'colors'

class Logger {
  static success = (message: string) => {
    console.log(colors.green.bold(message), '\n')
  }

  static info = (message: string) => {
    console.log(colors.blue.bold(message), '\n')
  }

  static warning = (message: string) => {
    console.log(colors.yellow.bold(message), '\n')
  }

  static error = (message: string, error: any) => {
    const logError = {
      name: error.name,
      message: error.message,
      stack: error.stack
    }

    console.log(colors.red.bold(message), '\n')
    throw logError
  }
}

export default Logger