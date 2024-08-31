import { LogInfo, Tag } from '../../types/Log'

export default class Log {
  private static readonly _timestamp = new Date().toISOString()
  private static readonly _separator = '\n----------------------------------------------------------------'

  public static readonly debug = (tag: Tag, message: string): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'debug',
    }

    console.log(log, this._separator)
  }

  public static readonly info = (tag: Tag, message: string): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'info',
    }

    console.log(log, this._separator)
  }

  public static readonly warn = (tag: Tag, message: string): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'warn',
    }

    console.log(log, this._separator)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static readonly error = (tag: Tag, message: string, error: any): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'error',
      stacktrace: error,
    }

    console.log(log, this._separator)
  }

  public static readonly verbose = (tag: Tag, message: string): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'verbose',
    }

    console.log(log, this._separator)
  }
}
