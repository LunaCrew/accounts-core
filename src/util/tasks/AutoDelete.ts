import { CronJob } from 'cron'
import { collections } from '../../app'
import Log from '../log/Log'

export default class AutoDelete {

  public static readonly startCronJob = () => {
    this._job.start()
    Log.debug('Job started', 'Tasks :: AutoDelete')
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
  
      Log.info(`Deleted accounts: ${result.deletedCount}`, 'Tasks :: AutoDelete')
      Log.info(`Next request: ${this._job.nextDate().toISO()}`, 'Tasks :: AutoDelete')      
    } catch (error) {
      Log.error(`${error}`, 'Tasks :: AutoDelete')
    }
  }
}
