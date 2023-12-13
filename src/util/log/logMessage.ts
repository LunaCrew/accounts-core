import colors from 'colors'
import LogType from '../enum/LogType'

const logMessage = (type: string, message: string) => {
  switch (type) {
  case LogType.SUCCESS:
    console.log(colors.green(message))
    break
  case LogType.WARNING:
    console.log(colors.yellow(message))
    break
  case LogType.ERROR:
    console.log(colors.red(message))
  }
}

export default logMessage