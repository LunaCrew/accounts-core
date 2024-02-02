import noteSchema from 'src/schema/noteSchema'

describe(':: Schema :: NoteSchema ::', () => {
  it('should validate a note', () => {
    const note = {
      userId: 'b353ac80-a322-45f0-812a-3e6f9b615faa',
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
      '"userId" is required',
      '"note" is required'
    ]

    expect(error?.details).toHaveLength(2)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct error messages', () => {
    const note = {
      userId: '1235456789',
      createdAt: '31-12-2023',
      updatedAt: '31-12-2023',
      note: 'a'.repeat(2001)
    }
    const { error } = noteSchema.validate(note, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"userId" must be a valid GUID',
      '"note" length must be less than or equal to 2000 characters long',
    ]

    expect(error?.details).toHaveLength(2)
    expect(receivedMessages).toEqual(expectedMessages)
  })
})