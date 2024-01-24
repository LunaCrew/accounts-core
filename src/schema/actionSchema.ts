import joi from 'joi'
import ActionType from '../util/enum/ActionType'
import InputPattern from '../util/enum/InputPattern'
import CustomError from '../util/enum/CustomError'

const actionSchema = joi.object({
  type: joi.string().valid(...Object.values(ActionType)).required(),
  name: joi.string().when('type', { is: ActionType.REMINDER, then: joi.string().forbidden(), otherwise: joi.string().min(2).max(16).required() }),
  favorite: joi.boolean().when('type', { is: ActionType.BUTTON, then: joi.boolean().default(false), otherwise: joi.boolean().forbidden() }),
  text: joi.string().when('type', { is: ActionType.BUTTON, then: joi.string().min(2).max(280).required(), otherwise: joi.string().forbidden() }),
  focusTimer: joi.number().when('type', { is: ActionType.TIMER, then: joi.number().greater(1).less(60).required(), otherwise: joi.number().forbidden() }),
  pauseTimer: joi.number().when('type', { is: ActionType.TIMER, then: joi.number().greater(1).less(60).required(), otherwise: joi.number().forbidden() }),
  priority: joi.number().when('type', { is: ActionType.REMINDER, then: joi.number().min(1).max(5).required(), otherwise: joi.number().forbidden() }),
  requiredEnergy: joi.number().when('type', { is: ActionType.REMINDER, then: joi.number().min(1).max(10).required(), otherwise: joi.number().forbidden() }),
  dateTime: joi.string().when('type', {
    is: ActionType.REMINDER, then: joi.string().pattern(InputPattern.DATE_TIME_TIMEZONE)
      .messages({ 'string.pattern.base': CustomError.DATE_TIME_TIMEZONE }).required(),
    otherwise: joi.string().forbidden()
  }),
  message: joi.string().when('type', { is: ActionType.REMINDER, then: joi.string().min(2).max(144).required(), otherwise: joi.string().forbidden() })
})

export default actionSchema
