import { uuid } from 'uuidv4'
import actionSchema from 'src/schema/ActionSchema'
import ActionType from 'src/util/enum/ActionType'

describe(':: Schema :: ActionSchema ::', () => {
  it('should validate a buttom action', () => {
    const buttom = {
      actions: [{
        id: uuid(),
        type: ActionType.BUTTOM,
        name: 'buttom',
        text: 'this is a buttom',
        favorite: true
      }]
    }

    const result = actionSchema.validate(buttom)
    expect(result.error).toBeUndefined()
  })

  it('should validate a reminder action', () => {
    const reminder = {
      actions: [{
        id: uuid(),
        type: ActionType.REMINDER,
        priority: 3,
        requiredEnergy: 7,
        datetime: '2023-12-31T10:30:00-0300',
        message: 'this is a reminder'
      }]
    }

    const result = actionSchema.validate(reminder)
    expect(result.error).toBeUndefined()
  })

  it('should validate a timer action', () => {
    const timer = {
      actions: [{
        id: uuid(),
        type: ActionType.TIMER,
        name: 'timer',
        focusTimer: 25,
        pauseTimer: 5
      }]
    }

    const result = actionSchema.validate(timer)
    expect(result.error).toBeUndefined()
  })

  it('should validate 3 types of actions', () => {
    const actions = {
      actions: [
        {
          id: uuid(),
          type: ActionType.BUTTOM,
          name: 'buttom',
          text: 'this is a buttom',
          favorite: true
        },
        {
          id: uuid(),
          type: ActionType.REMINDER,
          priority: 3,
          requiredEnergy: 7,
          datetime: '2023-12-31T10:30:00-0300',
          message: 'this is a reminder'
        },
        {
          id: uuid(),
          type: ActionType.TIMER,
          name: 'timer',
          focusTimer: 25,
          pauseTimer: 5
        }
      ]
    }

    const result = actionSchema.validate(actions)
    expect(result.error).toBeUndefined()
  })

  it('should fail if a empty object is sent', () => {
    const actions = {}
    const { error } = actionSchema.validate(actions, { abortEarly: false })

    expect(error?.details).toHaveLength(1)
    expect(error?.message).toEqual('"actions" is required')
  })

  it('should have the correct error messages', () => {
    const actions = {
      actions: [
        {
          id: '123453685168',
          type: 'not a button',
          name: 'a',
          text: 'a',
          favorite: 'not a boolean'
        },
        {
          id: '123453685168',
          type: ActionType.BUTTOM,
          name: 'a'.repeat(17),
          text: 'a'.repeat(281),
          favorite: 'not a boolean'
        },
        {
          id: '123453685168',
          type: ActionType.BUTTOM,
          priority: 'aaa',
          requiredEnergy: 'aaa',
          datetime: '2023-12-31',
          message: 'a'
        },
        {
          id: '123453685168',
          type: ActionType.REMINDER,
          priority: 0,
          requiredEnergy: 0,
          datetime: '2023-12-31',
          message: 'a'.repeat(145)
        },
        {
          id: '123453685168',
          type: ActionType.REMINDER,
          priority: 6,
          requiredEnergy: 11,
          datetime: '2023-12-31',
          message: 'a'
        },
        {
          id: '123453685168',
          type: 'not a timer',
          name: 'a',
          focusTimer: 'aaaa',
          pauseTimer: 'aaaa'
        },
        {
          id: '123453685168',
          type: ActionType.TIMER,
          name: 'a'.repeat(17),
          focusTimer: 0,
          pauseTimer: 0
        },
        {
          id: '123453685168',
          type: ActionType.TIMER,
          name: 'a',
          focusTimer: 61,
          pauseTimer: 61
        }
      ]
    }

    const { error } = actionSchema.validate(actions, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"actions[0].id" must be a valid GUID',
      '"actions[0].type" must be one of [buttom, reminder, timer]',
      '"actions[0].name" length must be at least 2 characters long',
      '"actions[0].favorite" must be a boolean',
      '"actions[1].id" must be a valid GUID',
      '"actions[1].name" length must be less than or equal to 16 characters long',
      '"actions[1].favorite" must be a boolean',
      '"actions[1].text" length must be less than or equal to 280 characters long',
      '"actions[2].id" must be a valid GUID',
      '"actions[2].name" is required',
      '"actions[2].text" is required',
      '"actions[2].priority" must be a number',
      '"actions[2].requiredEnergy" must be a number',
      '"actions[3].id" must be a valid GUID',
      '"actions[3].priority" must be greater than or equal to 1',
      '"actions[3].requiredEnergy" must be greater than or equal to 1',
      '"actions[3].message" length must be less than or equal to 144 characters long',
      '"actions[4].id" must be a valid GUID',
      '"actions[4].priority" must be less than or equal to 5',
      '"actions[4].requiredEnergy" must be less than or equal to 10',
      '"actions[4].message" length must be at least 2 characters long',
      '"actions[5].id" must be a valid GUID',
      '"actions[5].type" must be one of [buttom, reminder, timer]',
      '"actions[5].name" length must be at least 2 characters long',
      '"actions[5].focusTimer" must be a number',
      '"actions[5].pauseTimer" must be a number',
      '"actions[6].id" must be a valid GUID',
      '"actions[6].name" length must be less than or equal to 16 characters long',
      '"actions[6].focusTimer" must be greater than 1',
      '"actions[6].pauseTimer" must be greater than 1',
      '"actions[7].id" must be a valid GUID',
      '"actions[7].name" length must be at least 2 characters long',
      '"actions[7].focusTimer" must be less than 60',
      '"actions[7].pauseTimer" must be less than 60'
    ]

    expect(error?.details).toHaveLength(34)
    expect(receivedMessages).toEqual(expectedMessages)
  })
})