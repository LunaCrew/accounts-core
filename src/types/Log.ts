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

export type Details = {
  level: 'debug' | 'info' | 'warn' | 'error' | 'verbose'
  message: string
  tag: Tag
  timestamp: string
}
