import { Color } from '../../types/Color'
import EnumColor from '../enum/Color'
import formatTimestamp from './timestamp'

const timestamp = formatTimestamp(new Date())
const { cyan, base, green, blue, yellow, red } = EnumColor

export default class Log {
  message: string

  constructor(message: string) {
    this.message = message
  }

  static readonly debug = (message: string, tag?: string): void => {
    if (!tag) tag = 'debug'
    const log = `${cyan}[ ${timestamp} ] ${green}:: ${tag} :: ${base}=> ${message}\n`
    const details = {
      level: 'debug',
      message: message,
      tag: tag,
      timestamp: timestamp,
    }

    console.log(log, 'details:', details)
  }

  static readonly info = (message: string, tag?: string): void => {
    if (!tag) tag = 'info'
    const log = `${cyan}[ ${timestamp} ] ${blue}:: ${tag} :: ${base}=> ${message}\n`
    const details = {
      level: 'info',
      message: message,
      tag: tag,
      timestamp: timestamp,
    }

    console.log(log, 'details:', details)
  }

  static readonly warn = (message: string, tag?: string): void => {
    if (!tag) tag = 'warn'
    const log = `${cyan}[ ${timestamp} ] ${yellow}:: ${tag} :: ${base}=> ${message}\n`
    const details = {
      level: 'warn',
      message: message,
      tag: tag,
      timestamp: timestamp,
    }

    console.log(log, 'details:', details)
  }

  static readonly error = (message: string, tag?: string): void => {
    if (!tag) tag = 'error'
    const log = `${cyan}[ ${timestamp} ] ${red}:: ${tag} :: ${base}=> ${message}\n`
    const details = {
      level: 'error',
      message: message,
      tag: tag,
      timestamp: timestamp,
    }

    console.log(log, 'details:', details)
  }

  static readonly verbose = (message: string, tag?: string): void => {
    if (!tag) tag = 'verbose'
    const log = `${cyan}[ ${timestamp} ] ${base}:: ${tag} :: ${base}=> ${message}\n`
    const details = {
      level: 'verbose',
      message: message,
      tag: tag,
      timestamp: timestamp,
    }

    console.log(log, 'details:', details)
  }

  static readonly custom = (message: string, options?: { tag?: string, tagColor?: Color, tagIcon?: string, iconColor?: Color, messageColor?: Color }): void => {
    options = options || {}

    options.tag = !options.tag ? '' : ` :: ${options.tag} :: `
    options.tagColor = !options.tagColor ? 'base' : options.tagColor
    options.tagIcon = !options.tagIcon ? '' : ` ${options.tagIcon} `
    options.iconColor = !options.iconColor ? 'base' : options.iconColor
    options.messageColor = !options.messageColor ? 'base' : options.messageColor

    const tagColorValue = EnumColor[options.tagColor]
    const messageColorValue = EnumColor[options.messageColor]
    const iconColorValue = EnumColor[options.iconColor]

    const log = `${cyan}[ ${timestamp} ]${tagColorValue}${options.tag}${iconColorValue}${options.tagIcon}${base}${messageColorValue} => ${message}${base}\n`
    const details = {
      level: 'custom',
      message: message,
      tag: options.tag,
      timestamp: timestamp,
    }

    console.log(log, 'details:', details)
  }
}
