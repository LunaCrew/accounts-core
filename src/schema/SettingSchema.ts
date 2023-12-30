import joi from 'joi'
import Theme from 'src/util/enum/Theme'
import NotificationType from 'src/util/enum/NotificationType'
import SpeechType from 'src/util/enum/SpeechType'

const settingSchema = joi.object().keys({
  theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
  animations: joi.boolean().default(true),
  notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.POPUP),
  speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL),
})

export default settingSchema
