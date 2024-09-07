import { CronJob } from 'cron'
import { collections } from '../../app'
import { EmailInfo } from '../../types/Email'
import Language from '../enum/Language'
import Log from '../log/Log'
import Mailer from './Mailer'

export default class AutoDelete {

  public static readonly startCronJob = () => {
    this._job.start()
    Log.info('task', 'Tasks :: AutoDelete :: Job started')
  }

  private static readonly _job = CronJob.from({
    cronTime: '13 12 01 * * 0-6', // every day at 01:12:13 GMT-03:00
    onTick: function () {
      AutoDelete.autoDelete()
    },
    start: true,
    timeZone: 'America/Sao_Paulo'
  })

  private static readonly autoDelete = async () => {
    try {
      const currentTime = new Date().toISOString()
      const query = { $and: [{ isDisabled: true }, { expiresIn: { $lt: currentTime } }] }

      const accounts = await collections.users.find(query, { projection: { email: 1, settings: { language: 1 } } }).toArray()

      // delete all accounts
      const deleteAccounts = await collections.users.deleteMany(query)

      /**
       * Create lists of emails based on the language.
       * 
       * Any language that does not have a translation in the i18n folder
       * will be added to the default language list (i.e. en-us).
       */

      const listOfEmailsInEnUS: string[] = []
      const listOfEmailsInPtBr: string[] = []
      const listOfEmailsInEs: string[] = []
      const listOfEmailsInRu: string[] = []
      const listOfEmailsInFr: string[] = []
      const listOfEmailsInDe: string[] = []

      accounts.forEach((account) => {
        switch (account.settings.language) {
          case Language.PT_BR: {
            listOfEmailsInPtBr.push(account.email)
            break
          }
          case Language.ES: {
            listOfEmailsInEs.push(account.email)
            break
          }
          case Language.RU: {
            listOfEmailsInRu.push(account.email)
            break
          }
          case Language.FR: {
            listOfEmailsInFr.push(account.email)
            break
          }
          case Language.DE: {
            listOfEmailsInDe.push(account.email)
            break
          }
          default: {
            listOfEmailsInEnUS.push(account.email)
            break
          }
        }
      })

      /**
       * Build the properties to render each email batch.
       * 
       * @example 
       * {
       *   receiversEmail: ['jane@example.com', 'john@example.com'],
       *   language: 'en-us',
       * }
       */
      const emailBatches: EmailInfo[] = [
        {
          receiversEmail: listOfEmailsInEnUS.toString(),
          language: Language.EN_US,
        },
        {
          receiversEmail: listOfEmailsInPtBr.toString(),
          language: Language.PT_BR,
        },
        {
          receiversEmail: listOfEmailsInEs.toString(),
          language: Language.ES,
        },
        {
          receiversEmail: listOfEmailsInRu.toString(),
          language: Language.RU,
        },
        {
          receiversEmail: listOfEmailsInFr.toString(),
          language: Language.FR,
        },
        {
          receiversEmail: listOfEmailsInDe.toString(),
          language: Language.DE,
        },
      ]

      /**
       * Send emails for all deleted accounts aggregated by language.
       * 
       * These emails are sent to inform users that their accounts have been deleted
       * in compliance with the data lifecycle policy listed on Terms of Service and Privacy Policy.
       */
      const sentEmails = { sent: 0, accepted: 0, rejected: 0 }

      emailBatches.forEach(async (batch) => {
        const receivers = batch.receiversEmail.length
        if (receivers > 0) {
          const send = await Mailer.sendAccountDeletedEmail(batch)
          sentEmails.sent += receivers
          sentEmails.accepted += send.accepted
          sentEmails.rejected += send.rejected
        }
      })

      const details = {
        nextRequest: this._job.nextDate().toISO(),
        deletedAccounts: deleteAccounts.deletedCount,
        sentEmails
      }

      Log.info('task_auto_delete', 'AutoDelete :: Executed', details)
    } catch (error) {
      Log.error('task_auto_delete', 'Tasks :: AutoDelete', error)
    }
  }
}
