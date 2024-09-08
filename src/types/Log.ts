/* eslint-disable @typescript-eslint/no-explicit-any */
export type Tag =
  'controller'
  | 'service'
  | 'application'
  | 'database'
  | 'middleware'
  | 'error'
  | 'error_handler'
  | 'task'
  | 'task_mailer'
  | 'task_auto_delete'

export type LogInfo = {
  message: string
  tag: Tag
  timestamp: string
  level: 'debug' | 'info' | 'warn' | 'error'
  details?: object
  stacktrace?: any
}
