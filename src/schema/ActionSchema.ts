import joi from 'joi'
import ActionType from 'src/util/enum/ActionType'

const actionItems = joi.object().keys({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
  type: joi.string().valid(...Object.values(ActionType)).required(),
  name: joi.string().when('type', { is: ActionType.REMINDER, then: joi.string().not(), otherwise: joi.string().min(2).max(16).required() }),
  favorite: joi.boolean().when('type', { is: ActionType.BUTTOM, then: joi.boolean().default(false), otherwise: joi.boolean().not() }),
  text: joi.string().when('type', { is: ActionType.BUTTOM, then: joi.string().min(2).max(280).required(), otherwise: joi.string().not() }),
  focusTimer: joi.number().when('type', { is: ActionType.TIMER, then: joi.number().greater(1).less(60).required(), otherwise: joi.number().not() }),
  pauseTimer: joi.number().when('type', { is: ActionType.TIMER, then: joi.number().greater(1).less(60).required(), otherwise: joi.number().not() }),
  priority: joi.number().when('type', { is: ActionType.REMINDER, then: joi.number().min(1).max(5).required(), otherwise: joi.number().not() }),
  requiredEnergy: joi.number().when('type', { is: ActionType.REMINDER, then: joi.number().min(1).max(10).required(), otherwise: joi.number().not() }),
  datetime: joi.string().when('type', { is: ActionType.REMINDER, then: joi.string().isoDate().required(), otherwise: joi.string().not() }),
  message: joi.string().when('type', { is: ActionType.REMINDER, then: joi.string().min(2).max(144).required(), otherwise: joi.string().not() })
})

const actionSchema = joi.object().keys({
  actions: joi.array().items(actionItems).required()
})

export default actionSchema
