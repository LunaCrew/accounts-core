import actionSchema from 'src/schema/actionSchema'
import ActionType from 'src/util/enum/ActionType'

describe(':: Schema :: ActionSchema ::', () => {
  it('should validate a button action', () => {
    const button = {
      type: ActionType.BUTTON,
      name: 'button',
      text: 'this is a button',
      favorite: true
    }

    const result = actionSchema.validate(button)
    expect(result.error).toBeUndefined()
  })

  it('should return the correct button error messages with wrong types', () => {
    const button = {
      id: 'aaaaaaaaaa',
      type: ActionType.BUTTON,
      name: 0,
      text: 0,
      favorite: 'not a boolean'
    }

    const { error } = actionSchema.validate(button, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" must be a string',
      '"favorite" must be a boolean',
      '"text" must be a string',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct button error messages with min length', () => {
    const button = {
      id: 'aaaaaaaaaa',
      type: ActionType.BUTTON,
      name: 'a',
      text: 'a',
      favorite: 'not a boolean'
    }

    const { error } = actionSchema.validate(button, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" length must be at least 2 characters long',
      '"favorite" must be a boolean',
      '"text" length must be at least 2 characters long',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct button error messages with max length', () => {
    const button = {
      id: 'aaaaaaaaaa',
      type: ActionType.BUTTON,
      name: 'a'.repeat(17),
      text: 'a'.repeat(281),
      favorite: 'not a boolean'
    }

    const { error } = actionSchema.validate(button, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" length must be less than or equal to 16 characters long',
      '"favorite" must be a boolean',
      '"text" length must be less than or equal to 280 characters long',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should validate a reminder action', () => {
    const reminder = {
      type: ActionType.REMINDER,
      priority: 3,
      requiredEnergy: 7,
      dateTime: '2023-12-31T15:23:00-0300',
      message: 'this is a reminder'
    }

    const result = actionSchema.validate(reminder)
    expect(result.error).toBeUndefined()
  })

  it('should return the correct reminder error messages with wrong types', () => {
    const reminder = {
      id: 'aaaaaaa',
      type: ActionType.REMINDER,
      priority: 'aaa',
      requiredEnergy: 'aaa',
      dateTime: 0,
      message: 0
    }

    const { error } = actionSchema.validate(reminder, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"priority" must be a number',
      '"requiredEnergy" must be a number',
      '"dateTime" must be a string',
      '"message" must be a string',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct reminder error messages with min values', () => {
    const reminder = {
      id: 'aaaaaaa',
      type: ActionType.REMINDER,
      priority: 0,
      requiredEnergy: 0,
      dateTime: '2023/31/12',
      message: 'a'
    }

    const { error } = actionSchema.validate(reminder, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"priority" must be greater than or equal to 1',
      '"requiredEnergy" must be greater than or equal to 1',
      '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>',
      '"message" length must be at least 2 characters long',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct reminder error messages with max values', () => {
    const reminder = {
      id: 'aaaaaaa',
      type: ActionType.REMINDER,
      priority: 6,
      requiredEnergy: 11,
      dateTime: '2023/31/12',
      message: 'a'.repeat(145)
    }

    const { error } = actionSchema.validate(reminder, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"priority" must be less than or equal to 5',
      '"requiredEnergy" must be less than or equal to 10',
      '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>',
      '"message" length must be less than or equal to 144 characters long',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should validate a timer action', () => {
    const timer = {
      type: ActionType.TIMER,
      name: 'timer',
      focusTimer: 25,
      pauseTimer: 5
    }

    const result = actionSchema.validate(timer)
    expect(result.error).toBeUndefined()
  })

  it('should return the correct timer error messages with wrong types', () => {
    const timer = {
      id: 'aaaa',
      type: ActionType.TIMER,
      name: 0,
      focusTimer: 'aaa',
      pauseTimer: 'aaa'
    }

    const { error } = actionSchema.validate(timer, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" must be a string',
      '"focusTimer" must be a number',
      '"pauseTimer" must be a number',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct timer error messages with min values', () => {
    const timer = {
      id: 'aaaa',
      type: ActionType.TIMER,
      name: 'a',
      focusTimer: 0,
      pauseTimer: 0
    }

    const { error } = actionSchema.validate(timer, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" length must be at least 2 characters long',
      '"focusTimer" must be greater than 1',
      '"pauseTimer" must be greater than 1',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct timer error messages with max values', () => {
    const timer = {
      id: 'aaaa',
      type: ActionType.TIMER,
      name: 'a'.repeat(17),
      focusTimer: 61,
      pauseTimer: 61
    }

    const { error } = actionSchema.validate(timer, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" length must be less than or equal to 16 characters long',
      '"focusTimer" must be less than 60',
      '"pauseTimer" must be less than 60',
      '"id" is not allowed'
    ]

    expect(error?.details).toHaveLength(4)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should fail if a empty object is sent', () => {
    const actions = {}
    const { error } = actionSchema.validate(actions, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)

    const expectedMessages = [
      '"type" is required',
      '"name" is required'
    ]

    expect(error?.details).toHaveLength(2)
    expect(receivedMessages).toEqual(expectedMessages)
  })
})