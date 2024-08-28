import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import L from '../../i18n/i18n-node'
import { EmailInfo } from '../../types/Email'
import EmailVerificationCode from '../email/EmailVerificationCode'
import Log from '../log/Log'
dotenv.config({ path: '.env' })

export default class Mailer {
  public static readonly sendVerificationCode = async (emailInfo: EmailInfo): Promise<boolean> => {
    try {
      const locale = emailInfo.language as keyof typeof L
      const body = EmailVerificationCode.render(emailInfo)
      const subject = L[locale].hi_name_here_is_your_verification_code({ name: emailInfo.receiverName })
      const email = {
        from: `'Luna' <${process.env.MAILER_SENDER}>`,
        to: emailInfo.receiverEmail,
        subject: subject,
        html: body
      }

      const send = await this._transporter.sendMail(email)
      Log.info('task_mailer', `Tasks :: Mailer :: Sent :: ${send.messageId}`)

      return send.accepted.length > 0
    } catch (error) {
      Log.error('task_mailer', `Tasks :: Mailer :: ${error}`)
      return false
    }
  }

  private static readonly _transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  })
}
