import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import L from '../../i18n/i18n-node'
import { EmailInfo } from '../../types/Email'
import VerificationEmail from '../email/VerificationEmail'
import Log from '../log/Log'
dotenv.config({ path: '.env' })

export default class Mailer {
  public static readonly sendVerificationCode = async (emailInfo: EmailInfo): Promise<boolean> => {
    try {
      const locale = emailInfo.language as keyof typeof L
      const body = VerificationEmail.render(emailInfo)
      const subject = L[locale].confirm_your_email({ name: emailInfo.receiverName })
      const email = {
        from: `'Luna' <${process.env.MAILER_SENDER}>`,
        to: emailInfo.receiverEmail,
        subject: subject,
        html: body
      }

      const send = await this._transporter.sendMail(email)
      Log.info(`Tasks :: Mailer :: Sent :: ${send.messageId}`, 'task')

      return send.accepted.length > 0
    } catch (error) {
      Log.error(`Tasks :: Mailer :: ${error}`, 'task')
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
