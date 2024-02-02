import joi from 'joi'
import Theme from '../util/enum/Theme'
import InputPattern from '../util/enum/InputPattern'
import NotificationType from '../util/enum/NotificationType'
import SpeechType from '../util/enum/SpeechType'
import CustomError from '../util/enum/CustomError'

const settingsSchema = joi.object({
  theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
  animations: joi.boolean().default(true),
  notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.POPUP),
  speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL)
})

const userSchema = joi.object({
  displayName: joi.string().min(2).max(16).required(),
  username: joi.string().lowercase().min(3).max(12).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(16).pattern(InputPattern.PASSWORD).messages({ 'string.pattern.base': CustomError.PASSWORD }).required(),
  publicKey: joi.string().default(null),
  syncDeviceSettings: joi.boolean().default(true),
  createdAt: joi.string().default(new Date().toISOString()),
  deletedAt: joi.string().default(null),
  settings: joi.object().concat(settingsSchema).required()
})

const userParams = joi.object({
  id: joi.string().guid({ version: 'uuidv4' }),
  email: joi.string().lowercase().email(),
  username: joi.string().lowercase().min(3).max(12)
})

export { userParams }
export default userSchema