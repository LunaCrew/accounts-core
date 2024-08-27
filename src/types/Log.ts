export type Tag = 'controller' | 'service' | 'task' | 'application' | 'database' | 'middleware' | 'error_handler'

export type Details = {
  level: 'debug' | 'info' | 'warn' | 'error' | 'verbose'
  message: string
  tag: Tag
  timestamp: string
}
