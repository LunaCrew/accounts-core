import crypto from 'crypto'

class Password {
  static encrypt = (password: string) => {
    const hash = crypto.createHash('sha512').update(password).digest('hex')
    return hash
  }

  static validate = (hashedPassword: string, plainPassword: string): boolean => {
    const hash = crypto.createHash('sha512').update(plainPassword).digest('hex')
    if (hashedPassword === hash) {
      return true
    } else {
      return false
    }
  }
}

export default Password
