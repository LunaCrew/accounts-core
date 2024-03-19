import Logger from 'src/util/log/Logger'

describe(':: Util :: Log :: LogMessage ::', () => {

  it('should call logMessage with a success message', () => {
    const logger = Logger.success(':: Success message should be green ::')
    expect(logger).toHaveBeenCalled
  })

  it('should call logMessage with a warning message', () => {
    const logger = Logger.warning(':: Warning message should be yellow ::')
    expect(logger).toHaveBeenCalled
  })

  it('should call logMessage with a info message', () => {
    const logger = Logger.info(':: Info message should be blue ::')
    expect(logger).toHaveBeenCalled
  })

  it('should call logMessage with a error message', () => {
    const logger = Logger.error(':: Error message should be red ::')
    expect(logger).toHaveBeenCalled
  })
})