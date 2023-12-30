import joi from 'joi'

const noteSchema = joi.object().keys({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
  createdAt: joi.string().isoDate().required(),
  updatedAt: joi.string().isoDate().default(null),
  note: joi.string().max(2000).required()
})

export default noteSchema
