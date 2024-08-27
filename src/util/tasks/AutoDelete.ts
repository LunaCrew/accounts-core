import { CronJob } from 'cron'
import { collections } from '../../app'
import Log from '../log/Log'

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
      const result = await collections.users.deleteMany(query)

      Log.info('task', `Tasks :: AutoDelete :: Deleted accounts: ${result.deletedCount}`)
      Log.info('task', `Tasks :: AutoDelete :: Next request: ${this._job.nextDate().toISO()}`)
    } catch (error) {
      Log.error('task', `Tasks :: AutoDelete :: ${error}`)
    }
  }
}
