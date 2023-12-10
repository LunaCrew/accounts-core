import logMessage from 'src/util/log/logMessage'
import enumLog from 'src/util/enum/enumLog'

describe(':: Util :: Log ::', () => {

  it('should call logMessage with a success message', () => {
    const message = logMessage(enumLog.SUCCESS, 'Success message should be green')
    expect(message).toHaveBeenCalled
  })

  it('should call logMessage with a warning message', () => {
    const message = logMessage(enumLog.WARNING, 'Warning message should be yellow')
    expect(message).toHaveBeenCalled
  })

  it('should call logMessage with a error message', () => {
    const message = logMessage(enumLog.ERROR, 'Error message should be red')
    expect(message).toHaveBeenCalled
  })
})