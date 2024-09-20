import { DeleteResult } from 'mongodb'
import { EmailInfo } from '../../types/Email'
import Language from '../enum/Language'
import Log from '../log/Log'
import { AccountsToDelete, DeletedStatus } from '../../types/ScheduledDelete'
import Mailer from './Mailer'

export default class ScheduledDelete {
  public static readonly deleteAndNotify = async (
    accounts: AccountsToDelete,
    deleteAccounts: DeleteResult
  ): Promise<DeletedStatus | undefined> => {
    try {

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
      const emails = { sent: 0, accepted: 0, rejected: 0 }

      emailBatches.forEach(async (batch) => {
        const receivers = batch.receiversEmail.length
        if (receivers > 0) {
          const send = await Mailer.sendAccountDeletedEmail(batch)
          emails.sent += receivers
          emails.accepted += send.accepted
          emails.rejected += send.rejected
        }
      })

      const details: DeletedStatus = {
        deleted: deleteAccounts.deletedCount,
        emails
      }

      Log.info('task', 'ScheduledDelete :: Executed', details)
      return details
    } catch (error) {
      Log.error('task', 'Tasks :: ScheduledDelete', error)
    }
  }
}
