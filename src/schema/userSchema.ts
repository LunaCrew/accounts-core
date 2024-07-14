import joi from 'joi'
import Theme from '../util/enum/Theme'
import NotificationType from '../util/enum/NotificationType'
import SpeechType from '../util/enum/SpeechType'
import Build from '../util/enum/Build'

const userQueryParams = joi.object({
  id: joi.string().guid({ version: 'uuidv4' }),
  email: joi.string().lowercase().email(),
}).or('id', 'email').required()

const userCreate = joi.object({
  name: joi.string().min(2).max(32).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().min(8).max(32).required(),
  isDeleted: joi.boolean().default(false),
  emailVerified: joi.boolean().default(false),
  emailVerificationToken: joi.string().default(null),
  mfa: joi.object({
    mfaToken: joi.string().default(null),
    mfaSecret: joi.string().default(null),
    mfaRecoveryCodes: joi.array().items(joi.string()).default(null),
    mfaRecoveryCodesGeneratedAt: joi.string().default(null),
    mfaRecoveryCodesUsedAt: joi.string().default(null),
    mfaRecoveryCodesRegeneratedAt: joi.string().default(null),
    mfaRecoveryCodesUsedCount: joi.number().default(null),
  }).required(),
  settings: joi.object({
    theme: joi.string().valid(...Object.values(Theme)).default(Theme.DARK),
    animations: joi.boolean().default(true),
    notificationType: joi.string().valid(...Object.values(NotificationType)).default(NotificationType.POPUP),
    speechType: joi.string().valid(...Object.values(SpeechType)).default(SpeechType.NEUTRAL),
    publicKey: joi.string().default(null),
    backupAccount: joi.string().lowercase().email().default(null),
    buildVersion: joi.string().valid(...Object.values(Build)).default(Build.RELEASE),
  }).required()
})

const userUpdate = joi.object({
  name: joi.string().min(2).max(32),
  email: joi.string().lowercase().email(),
  password: joi.string().min(8).max(32),
  isDeleted: joi.boolean(),
  emailVerified: joi.boolean(),
  emailVerificationToken: joi.string().allow(null),
  mfa: joi.object({
    mfaToken: joi.string().required(),
    mfaSecret: joi.string().required(),
    mfaRecoveryCodes: joi.array().items(joi.string()).required(),
    mfaRecoveryCodesGeneratedAt: joi.string().required(),
    mfaRecoveryCodesUsedAt: joi.string().required(),
    mfaRecoveryCodesRegeneratedAt: joi.string().required(),
    mfaRecoveryCodesUsedCount: joi.number().required(),
  }),
  settings: joi.object({
    theme: joi.string().valid(...Object.values(Theme)).required(),
    animations: joi.boolean().required(),
    notificationType: joi.string().valid(...Object.values(NotificationType)).required(),
    speechType: joi.string().valid(...Object.values(SpeechType)).required(),
    publicKey: joi.string().required(),
    backupAccount: joi.string().lowercase().email().required(),
    buildVersion: joi.string().valid(...Object.values(Build)).required(),
  })
}).or('name', 'email', 'password', 'isDeleted', 'emailVerified', 'emailVerificationToken', 'mfa', 'settings').required()

export { userCreate, userUpdate, userQueryParams }
