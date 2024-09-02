import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import L from '../../i18n/i18n-node'
import { EmailInfo, EmailSituation } from '../../types/Email'
import EmailAccountDeleted from '../email/EmailAccountDeleted'
import EmailAccountDisabled from '../email/EmailAccountDisabled'
import EmailVerificationCode from '../email/EmailVerificationCode'
import Log from '../log/Log'
dotenv.config({ path: '.env' })

export default class Mailer {
  public static readonly sendVerificationCode = async (emailInfo: EmailInfo): Promise<boolean> => {
    try {
      const locale = emailInfo.language as keyof typeof L
      const body = EmailVerificationCode.render(emailInfo)
      const subject = L[locale].hi_name_here_is_your_verification_code({ name: emailInfo.receiverName ?? '' })
      const email = {
        from: `'Luna' <${process.env.MAILER_SENDER}>`,
        to: emailInfo.receiversEmail,
        subject: subject,
        html: body
      }

      const send = await this._transporter.sendMail(email)
      Log.info('task_mailer', `Tasks :: Mailer :: SendVerificationCode :: Sent :: ${send.messageId}`)

      return send.accepted.length > 0
    } catch (error) {
      Log.error('task_mailer', 'Tasks :: Mailer :: SendVerificationCode', error)
      return false
    }
  }

  public static readonly sendAccountDisabledEmail = async (emailInfo: EmailInfo): Promise<boolean> => {
    try {
      const locale = emailInfo.language as keyof typeof L
      const body = EmailAccountDisabled.render(emailInfo)
      const subject = L[locale].your_account_has_been_disabled()
      const email = {
        from: `'Luna' <${process.env.MAILER_SENDER}>`,
        to: emailInfo.receiversEmail,
        subject: subject,
        html: body
      }

      const send = await this._transporter.sendMail(email)
      Log.info('task_mailer', `Tasks :: Mailer :: SendAccountDisabled :: Sent :: ${send.messageId}`)

      return send.accepted.length > 0
    } catch (error) {
      Log.error('task_mailer', 'Tasks :: Mailer :: SendAccountDisabled', error)
      return false
    }
  }

  public static readonly sendAccountDeletedEmail = async (emailInfo: EmailInfo): Promise<EmailSituation> => {
    try {
      const locale = emailInfo.language as keyof typeof L
      const body = EmailAccountDeleted.render(emailInfo)
      const subject = L[locale].your_account_has_been_deleted()
      const email = {
        from: `'Luna' <${process.env.MAILER_SENDER}>`,
        to: emailInfo.receiversEmail,
        subject: subject,
        html: body
      }

      const send = await this._transporter.sendMail(email)
      Log.info('task_mailer', `Tasks :: Mailer :: SendAccountDeleted :: Sent :: ${send.messageId}`)

      const status: EmailSituation = {
        accepted: send.accepted.length,
        rejected: send.rejected.length
      }

      return status
    } catch (error) {
      Log.error('task_mailer', 'Tasks :: Mailer :: SendAccountDeleted', error)
      return { accepted: 0, rejected: 0 }
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
