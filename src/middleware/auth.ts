import { Request, Response, NextFunction } from 'express'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import JWT from '../util/security/JWT'

const auth = (req: Request, res: Response, next: NextFunction) => {
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

export default auth
