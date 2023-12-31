import joi from 'joi'
import InputPattern from 'src/util/enum/InputPattern'
import actionSchema from './ActionSchema'
import noteSchema from './NoteSchema'
import Theme from 'src/util/enum/Theme'
import NotificationType from 'src/util/enum/NotificationType'
import SpeechType from 'src/util/enum/SpeechType'
import CustomError from 'src/util/enum/CustomError'

const userSchema = joi.object().keys({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
  displayName: joi.string().min(2).max(16).required(),
  username: joi.string().lowercase().min(3).max(12).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(16).pattern(InputPattern.PASSWORD)
    .messages({ 'string.pattern.base': CustomError.PASSWORD })
    .required(),
  publicKey: joi.string().default(''),
  syncDeviceSettings: joi.boolean().default(true),
  settings: joi.object().keys({
    theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
    animations: joi.boolean().default(true),
    notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.POPUP),
    speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL)
  }).required(),
  notes: joi.array().items(noteSchema).required(),
  actions: joi.array().items(actionSchema).required()
})

export default userSchema