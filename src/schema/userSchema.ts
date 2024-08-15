import joi from 'joi'
import Theme from '../util/enum/Theme'
import NotificationType from '../util/enum/NotificationType'
import SpeechType from '../util/enum/SpeechType'

const userQueryParams = joi.object({
  id: joi.string().guid({ version: 'uuidv4' }),
  email: joi.string().lowercase().email(),
}).or('id', 'email').required()

const userCreate = joi.object({
  name: joi.string().min(2).max(32).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(64).required(),
  isDeleted: joi.boolean().default(false),
  emailVerified: joi.boolean().default(false),
  emailVerificationToken: joi.string().default(null),
  settings: joi.object({
    theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
    animations: joi.boolean().default(true),
    notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.DEFAULT),
    speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL),
    mfa: joi.boolean().default(false)
  }).required()
})

const userUpdate = joi.object({
  name: joi.string().min(2).max(32),
  email: joi.string().lowercase().email(),
  password: joi.string().min(8).max(64),
  isDeleted: joi.boolean(),
  emailVerified: joi.boolean(),
  emailVerificationToken: joi.string().allow(null),
  settings: joi.object({
    theme: joi.string().valid(...Object.values(Theme)).required(),
    animations: joi.boolean().required(),
    notificationType: joi.string().valid(...Object.values(NotificationType)).required(),
    speechType: joi.string().valid(...Object.values(SpeechType)).required(),
    mfa: joi.boolean().required()
  })
}).or('name', 'email', 'password', 'isDeleted', 'emailVerified', 'emailVerificationToken', 'settings').required()

export { userCreate, userUpdate, userQueryParams }
