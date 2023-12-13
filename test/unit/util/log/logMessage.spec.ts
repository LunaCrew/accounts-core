import logMessage from 'src/util/log/logMessage'
import LogType from 'src/util/enum/LogType'

describe(':: Util :: Log :: LogMessage ::', () => {

  it('should call logMessage with a success message', () => {
    const message = logMessage(LogType.SUCCESS, 'Success message should be green')
    expect(message).toHaveBeenCalled
  })

  it('should call logMessage with a warning message', () => {
    const message = logMessage(LogType.WARNING, 'Warning message should be yellow')
    expect(message).toHaveBeenCalled
  })

  it('should call logMessage with a error message', () => {
    const message = logMessage(LogType.ERROR, 'Error message should be red')
    expect(message).toHaveBeenCalled
  })
})