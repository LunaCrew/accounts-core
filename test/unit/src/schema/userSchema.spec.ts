import userSchema from 'src/schema/userSchema'
import ActionType from 'src/util/enum/ActionType'
import NotificationType from 'src/util/enum/NotificationType'
import SpeechType from 'src/util/enum/SpeechType'
import Theme from 'src/util/enum/Theme'

describe(':: Schema :: UserSchema ::', () => {
  it('should validate a user', () => {
    const user = {
      displayName: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@doe.com',
      password: 'Abcd123/*',
      settings: {        
        theme: Theme.DARK,
        animations: true,
        notificationType: NotificationType.SILENT,
        speechType: SpeechType.NEUTRAL
      },
      notes: [{
        createdAt: new Date().toISOString(),
        note: 'this is a note'
      }],
      actions: [{
        type: ActionType.BUTTON,
        name: 'button',
        text: 'this is a button',
        favorite: true
      }]
    }

    const result = userSchema.validate(user)
    expect(result.error).toBeUndefined()
  })

  
  it('should return the correct error messages with wrong types', () => {
    const user = {
      displayName: 12321,
      username: 132132,
      email: 123123,
      password: 123131,
      settings: {        
        theme: 2323131,
        animations: 123132,
        notificationType: 12312313,
        speechType: 123123
      },
      notes: [{
        createdAt: 123123,
        note: 123123
      }],
      actions: [{
        type: 1231231,
        name: 123123,
        text: 1231231,
        favorite: 1231312
      }]
    }

    const { error } = userSchema.validate(user, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"displayName" must be a string',
      '"username" must be a string',
      '"email" must be a string',
      '"password" must be a string',
      '"settings.theme" must be one of [dark, light]',
      '"settings.theme" must be a string',
      '"settings.animations" must be a boolean',
      '"settings.notificationType" must be one of [popup, balloon, silent]',
      '"settings.notificationType" must be a string',
      '"settings.speechType" must be one of [male, female, neutral]',
      '"settings.speechType" must be a string',
      '"notes[0].createdAt" must be a string',
      '"notes[0].note" must be a string',
      '"actions[0].type" must be one of [button, reminder, timer]',
      '"actions[0].type" must be a string',
      '"actions[0].name" must be a string',
      '"actions[0].favorite" is not allowed',
      '"actions[0].text" is not allowed'
    ]

    expect(error?.details).toHaveLength(18)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct error messages with min values', () => {
    const user = {
      displayName: 'a',
      username: 'a',
      email: 'aaaaa',
      password: 'a',
      settings: {},
      notes: [],
      actions: []
    }

    const { error } = userSchema.validate(user, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"displayName" length must be at least 2 characters long',
      '"username" length must be at least 3 characters long',
      '"email" must be a valid email',
      '"password" length must be at least 8 characters long',
      '"password" must have uppercase and lowercase letters, numbers and special characters'
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct error messages with min values', () => {
    const user = {
      displayName: 'a'.repeat(17),
      username: 'a'.repeat(13),
      email: 'aaaaa',
      password: 'a'.repeat(17),
      settings: {},
      notes: [],
      actions: []
    }

    const { error } = userSchema.validate(user, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"displayName" length must be less than or equal to 16 characters long',
      '"username" length must be less than or equal to 12 characters long',
      '"email" must be a valid email',
      '"password" length must be less than or equal to 16 characters long',
      '"password" must have uppercase and lowercase letters, numbers and special characters'
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })
})