import { CronJob } from 'cron'
import { collections } from '../../app'
import Log from '@lunacrew/logger'

export default class AutoDelete {

  public static readonly startCronJob = () => {
    this._job.start()
    Log.d('Job started', 'Tasks :: AutoDelete')
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
  
      Log.i(`Deleted accounts: ${result.deletedCount}`, 'Tasks :: AutoDelete')
      Log.i(`Next request: ${this._job.nextDate().toISO()}`, 'Tasks :: AutoDelete')      
    } catch (error) {
      Log.e(`${error}`, 'Tasks :: AutoDelete')
    }
  }
}
