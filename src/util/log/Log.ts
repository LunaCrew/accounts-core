import { LogInfo, Tag } from '../../types/Log'

export default class Log {
  private static readonly _timestamp = new Date().toISOString()
  private static readonly _separator = '\n----------------------------------------------------------------\n'

  public static readonly debug = (tag: Tag, message: string, details?: object): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'debug',
    }
    if (details) log.details = details

    console.debug(this._separator, 'debug:', log)
  }

  public static readonly info = (tag: Tag, message: string, details?: object): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'info',
    }
    if (details) log.details = details

    console.info(this._separator, 'info:', log)
  }

  public static readonly warn = (tag: Tag, message: string): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'warn',
    }

    console.warn(this._separator, 'warn:', log)
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

    console.error(this._separator, 'error:', log)
  }

  public static readonly verbose = (tag: Tag, message: string): void => {
    const log: LogInfo = {
      message: message,
      tag: tag,
      timestamp: this._timestamp,
      level: 'verbose',
    }

    console.log(this._separator, 'verbose:', log)
  }
}
