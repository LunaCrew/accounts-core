import crypto from 'crypto'
import * as dotenv from 'dotenv'
import { NextFunction } from 'express'
import { BadRequest } from '../../error/CustomError'
import Log from '../log/Log'
dotenv.config({ path: '.env' })

export default class Cipher {
  private static readonly _algorithm = 'aes-256-cbc'
  private static readonly _key = process.env.CIPHER_KEY as string
  private static readonly _iv = crypto.randomBytes(16)

  public static readonly encode = (input: string, next: NextFunction) => {
    try {
      const cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv)
      let encrypted = cipher.update(input, 'utf8', 'hex')
  
      encrypted += cipher.final('hex')
  
      return `${this._iv.toString('hex')}:${encrypted}`
    } catch (error) {
      next(error)
      next()
    }
  }

  public static readonly decode = (input: string, next: NextFunction) => {
    try {
      const [ivHex, encrypted] = input.split(':')
      const iv = Buffer.from(ivHex, 'hex')
  
      const decipher = crypto.createDecipheriv(this._algorithm, this._key, iv)
  
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  
      decrypted += decipher.final('utf8')
  
      return decrypted
    } catch (error) {
      Log.error('error', 'Cipher :: Decode', error)
      next(new BadRequest('Invalid token'))
      next()
    }
  }
}
