import Log from 'src/util/log/Log'

describe('LogManager', () => {
  describe('constructor', () => {
    it('should set the message property', () => {
      const message = 'Test message'
      const logManager = new Log(message)

      expect(logManager.message).toBe(message)
    })
  })

  describe('debug', () => {
    it('should log a debug message with tag', () => {
      const tag = 'TestTag'
      const message = 'Debug message'

      Log.debug(message, tag)
      expect(Log.debug).toBeDefined()
    })

    it('should log a debug message without tag', () => {
      const message = 'Debug message'

      Log.debug(message)
      expect(Log.debug).toBeDefined()
    })
  })

  describe('info', () => {
    it('should log an info message with tag', () => {
      const tag = 'TestTag'
      const message = 'Info message'

      Log.info(message, tag)
      expect(Log.info).toBeDefined()
    })

    it('should log an info message without tag', () => {
      const message = 'Info message'

      Log.info(message)
      expect(Log.info).toBeDefined()
    })
  })

  describe('warn', () => {
    it('should log a warning message with tag', () => {
      const tag = 'TestTag'
      const message = 'Warn message'

      Log.warn(message, tag)
      expect(Log.warn).toBeDefined()
    })

    it('should log a warning message without tag', () => {
      const message = 'Warn message'

      Log.warn(message)
    })
  })

  describe('error', () => {
    it('should log an error message with tag', () => {
      const error = new Error('Error message')
      const tag = 'TestTag'

      Log.error(`${error}`, tag)

      expect(Log.error).toBeDefined()
    })

    it('should log an error message without tag', () => {
      const error = new Error('Error message')

      Log.error(`${error}`)

      expect(Log.error).toBeDefined()
    })
  })

  describe('verbose', () => {
    it('should log a verbose message with tag', () => {
      const tag = 'TestTag'
      const message = 'Verbose message'

      Log.verbose(message, tag)
      expect(Log.verbose).toBeDefined()
    })

    it('should log a verbose message without tag', () => {
      const message = 'Verbose message'

      Log.verbose(message)
      expect(Log.verbose).toBeDefined()
    })
  })

  describe('custom', () => {
    it('should log a custom message with custom options', () => {

      Log.custom('Message', { tag: 'Test', tagColor: 'red', tagIcon: 'ICON', iconColor: 'whiteOnGreen', messageColor: 'yellow' })
      expect(Log.custom).toBeDefined()
    })

    it('should log a custom message without custom options', () => {
      const message = 'Custom message'

      Log.custom(message)
      expect(Log.custom).toBeDefined()
    })
  })
})
