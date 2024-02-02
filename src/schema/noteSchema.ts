import joi from 'joi'

const noteSchema = joi.object({
  userId: joi.string().guid({ version: 'uuidv4' }).required(),
  createdAt: joi.string().default(new Date().toISOString()),
  updatedAt: joi.string().default(null),
  note: joi.string().max(2000).required()
})

export default noteSchema
