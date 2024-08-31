import joi from 'joi'
import Theme from '../util/enum/Theme'
import NotificationType from '../util/enum/NotificationType'
import SpeechType from '../util/enum/SpeechType'
import Language from '../util/enum/Language'

const userQueryParams = joi.object({
  id: joi.string().guid({ version: 'uuidv4' }),
  email: joi.string().lowercase().email(),
  forced: joi.boolean().default(false),
  token: joi.string().length(8).alphanum(),
  isEmailValidation: joi.boolean().default(false)
}).or('id', 'email').required()

const userCreate = joi.object({
  name: joi.string().min(2).max(32).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(64).required(),
  settings: joi.object({
    theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
    animations: joi.boolean().default(true),
    notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.DEFAULT),
    speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL),
    mfa: joi.boolean().default(false),
    language: joi.string().valid(...Object.values(Language)).default(Language.EN_US)
  }).required()
})

const userUpdate = joi.object({
  name: joi.string().min(2).max(32),
  email: joi.string().lowercase().email(),
  password: joi.string().min(8).max(64),
  settings: joi.object({
    theme: joi.string().valid(...Object.values(Theme)).required(),
    animations: joi.boolean().required(),
    notificationType: joi.string().valid(...Object.values(NotificationType)).required(),
    speechType: joi.string().valid(...Object.values(SpeechType)).required(),
    mfa: joi.boolean().required(),
    language: joi.string().valid(...Object.values(Language)).required()
  })
}).or('name', 'email', 'password', 'settings').required()

export { userCreate, userUpdate, userQueryParams }
