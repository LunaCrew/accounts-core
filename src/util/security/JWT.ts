import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default class JWT {
  public static readonly generate = (userId: string): string => {
    const payload = {
      userId: userId,
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }

    const signedToken = jwt.sign(payload, process.env.JWT_SECRET as string, { algorithm: 'HS256' })

    return signedToken
  }

  public static readonly verify = (token: string, next: NextFunction): jwt.JwtPayload | boolean => {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload
      return payload
    } catch (error) {
      next(error)
      return false
    }
  }
}
