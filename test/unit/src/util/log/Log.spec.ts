import Log from 'src/util/log/Log'

describe('Log', () => {
  it('should log a debug log', () => {
    const message = 'Debug message'

    Log.debug('task', message)

    expect(Log.debug).toBeDefined()
  })

  it('should log a debug message with details', () => {
    const message = 'Debug message'
    const details = { test: 'test' }

    Log.debug('task', message, details)

    expect(Log.debug).toBeDefined()
  })

  it('should log an info log', () => {
    const message = 'Info message'

    Log.info('task', message)

    expect(Log.info).toBeDefined()
  })

  it('should log an info message with details', () => {
    const message = 'Info message'
    const details = { test: 'test' }

    Log.info('task', message, details)

    expect(Log.info).toBeDefined()
  })

  it('should log a warning log', () => {
    const message = 'Warn message'

    Log.warn('task', message)

    expect(Log.warn).toBeDefined()
  })

  it('should log an error log', () => {
    const error = new Error('Error message')

    Log.error('task', `${error.message}`, error)

    expect(Log.error).toBeDefined()
  })
})
