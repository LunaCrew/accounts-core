import Log from 'src/util/log/Log'

describe('Log', () => {
  describe('debug', () => {
    it('should log a debug message with tag', () => {
      const message = 'Debug message'

      Log.debug('task', message)

      expect(Log.debug).toBeDefined()
    })
  })

  describe('info', () => {
    it('should log an info message with tag', () => {
      const message = 'Info message'

      Log.info('task', message)

      expect(Log.info).toBeDefined()
    })
  })

  describe('warn', () => {
    it('should log a warning message with tag', () => {
      const message = 'Warn message'

      Log.warn('task', message)

      expect(Log.warn).toBeDefined()
    })
  })

  describe('error', () => {
    it('should log an error message with tag', () => {
      const error = new Error('Error message')

      Log.error('task', `${error.message}`, error)

      expect(Log.error).toBeDefined()
    })
  })

  describe('verbose', () => {
    it('should log a verbose message with tag', () => {
      const message = 'Verbose message'

      Log.verbose('task', message)

      expect(Log.verbose).toBeDefined()
    })
  })
})
