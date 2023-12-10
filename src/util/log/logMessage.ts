import colors from 'colors'
import enumLog from '../enum/enumLog'

const logMessage = (type: string, message: string) => {
  switch (type) {
  case enumLog.SUCCESS:
    console.log(colors.green(message))
    break
  case enumLog.WARNING:
    console.log(colors.yellow(message))
    break
  case enumLog.ERROR:
    console.log(colors.red(message))
  }
}

export default logMessage