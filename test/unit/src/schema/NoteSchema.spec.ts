import { v4 as uuid } from 'uuid'
import noteSchema from 'src/schema/NoteSchema'

describe(':: Schema :: NoteSchema ::', () => {
  it('should validate a note', () => {
    const note = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      note: 'this is a note'
    }

    const result = noteSchema.validate(note)
    expect(result.error).toBeUndefined()
  })

  it('should fail if a empty object is sent', () => {
    const note = {}
    const { error } = noteSchema.validate(note, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"id" is required',
      '"createdAt" is required',
      '"note" is required'
    ]

    expect(error?.details).toHaveLength(3)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct error messages', () => {
    const note = {
      id: '1235456789',
      createdAt: '31-12-2023',
      updatedAt: '31-12-2023',
      note: 'a'.repeat(2001)
    }
    const { error } = noteSchema.validate(note, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"id" must be a valid GUID',
      '"createdAt" must be in iso format',
      '"updatedAt" must be in iso format',
      '"note" length must be less than or equal to 2000 characters long'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })
})