import { Tag } from '../../types/Log'
import EnumColor from '../enum/Color'
import formatTimestamp from './timestamp'

export default class Log {
  private static readonly _formattedTimestamp = formatTimestamp(new Date())
  private static readonly _timestamp = new Date().toISOString()
  private static readonly _cyan = EnumColor.cyan
  private static readonly _base = EnumColor.base

  public static readonly debug = (tag: Tag, message: string): void => {
    const log = `${this._cyan}[ ${this._formattedTimestamp} ] ${this._base}=> ${message}\n`
    const details = {
      level: 'debug',
      message: message,
      tag: tag,
      timestamp: this._timestamp,
    }

    console.log(log, 'details:', details)
  }

  public static readonly info = (tag: Tag, message: string): void => {
    const log = `${this._cyan}[ ${this._formattedTimestamp} ] ${this._base}=> ${message}\n`
    const details = {
      level: 'info',
      message: message,
      tag: tag,
      timestamp: this._timestamp,
    }

    console.log(log, 'details:', details)
  }

  public static readonly warn = (tag: Tag, message: string): void => {
    const log = `${this._cyan}[ ${this._formattedTimestamp} ] ${this._base}=> ${message}\n`
    const details = {
      level: 'warn',
      message: message,
      tag: tag,
      timestamp: this._timestamp,
    }

    console.log(log, 'details:', details)
  }

  public static readonly error = (tag: Tag, message: string): void => {
    const log = `${this._cyan}[ ${this._formattedTimestamp} ] ${this._base}=> ${message}\n`
    const details = {
      level: 'error',
      message: message,
      tag: tag,
      timestamp: this._timestamp,
    }

    console.log(log, 'details:', details)
  }

  public static readonly verbose = (tag: Tag, message: string): void => {
    const log = `${this._cyan}[ ${this._formattedTimestamp} ] ${this._base}=> ${message}\n`
    const details = {
      level: 'verbose',
      message: message,
      tag: tag,
      timestamp: this._timestamp,
    }

    console.log(log, 'details:', details)
  }
}
