import { Request, Response, NextFunction } from 'express'
import { getAppCheck } from 'firebase-admin/app-check'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import JWT from '../util/security/JWT'

export default class Auth {
  public static readonly jwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
  
    if (!token) {
      return res.status(HttpStatus.code.BAD_REQUEST).json({ error: CustomErrorMessage.AUTH_NOT_PROVIDED })
    }
  
    try {
      JWT.verify(token, next)
  
      next()
    } catch (error) {
      next(error)
    }
  }

  public static readonly appCheck = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('X-Firebase-AppCheck')
  
    if (!token) {
      return res.status(HttpStatus.code.UNAUTHORIZED).json({ error: CustomErrorMessage.UNAUTHORIZED })
    }
  
    try {
      await getAppCheck().verifyToken(token)
  
      return next()
    } catch (error) {
      next(error)
    }
  }
}
