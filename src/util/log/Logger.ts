/* eslint-disable @typescript-eslint/no-explicit-any */
import colors from 'colors'

export default class Logger {
  static readonly success = (message: string) => {
    console.log(colors.green.bold(message), '\n')
  }

  static readonly info = (message: string) => {
    console.log(colors.blue.bold(message), '\n')
  }

  static readonly warning = (message: string) => {
    console.log(colors.yellow.bold(message), '\n')
  }

  static readonly error = (message: string, error: string = '') => {
    console.log(colors.red.bold(message))
    console.log(error)
  }
} 
