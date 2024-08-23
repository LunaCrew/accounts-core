import nodemailer from 'nodemailer'
import L from '../../i18n/i18n-node'
import { EmailInfo } from '../../types/Email'
import VerificationEmail from '../email/VerificationEmail'
import Log from '../log/Log'

export default class Mailer {
  public static readonly sendEmailVerification = async (emailInfo: EmailInfo) => {
    try {
      const locale = emailInfo.language as keyof typeof L
      const body = VerificationEmail.render(emailInfo)
      const subject = L[locale].confirm_your_email({ name: emailInfo.receiverName })
      const email = {
        from: `'Luna' <${process.env.MAILER_USER}>`,
        to: emailInfo.receiverEmail,
        subject: subject,
        html: body
      }

      const send = await this._transporter.sendMail(email)

      Log.info(`Tasks :: Mailer :: Sent :: ${send.messageId}`, 'task')
    } catch (error) {
      Log.error(`Tasks :: Mailer :: ${error}`, 'task')
    }
  }

  private static readonly _transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  })
}
