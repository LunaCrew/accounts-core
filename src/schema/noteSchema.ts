import joi from 'joi'

const noteSchema = joi.object({
  createdAt: joi.string().default(new Date().toISOString()),
  updatedAt: joi.string().default(null),
  note: joi.string().max(2000).required()
})

export default noteSchema
