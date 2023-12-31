import { v4 as uuid } from 'uuid'
import userSchema from 'src/schema/UserSchema'
import ActionType from 'src/util/enum/ActionType'
import NotificationType from 'src/util/enum/NotificationType'
import SpeechType from 'src/util/enum/SpeechType'
import Theme from 'src/util/enum/Theme'

describe(':: Schema :: UserSchema ::', () => {
  it('should validate a user', () => {
    const user = {
      id: uuid(),
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
        id: uuid(),
        createdAt: new Date().toISOString(),
        note: 'this is a note'
      }],
      actions: [{
        id: uuid(),
        type: ActionType.BUTTON,
        name: 'button',
        text: 'this is a button',
        favorite: true
      }]
    }

    const result = userSchema.validate(user)
    expect(result.error).toBeUndefined()
  })
})