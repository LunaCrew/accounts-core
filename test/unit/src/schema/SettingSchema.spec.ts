import settingSchema from 'src/schema/SettingSchema'
import Theme from 'src/util/enum/Theme'
import NotificationType from 'src/util/enum/NotificationType'
import SpeechType from 'src/util/enum/SpeechType'

describe(':: Schema :: SettingSchema ::', () => {
  it('should validate a setting', () => {
    const setting = {
      theme: Theme.DARK,
      animations: true,
      notificationType: NotificationType.SILENT,
      speechType: SpeechType.NEUTRAL
    }

    const result = settingSchema.validate(setting)
    expect(result.error).toBeUndefined()
  })

  it('should send default values if no parameter is informed', () => {
    const setting = {}
    const expectResult = {
      animations: true, 
      notificationType: 'popup',
      speechType: 'neutral',
      theme: 'dark'
    }
    
    const result = settingSchema.validate(setting)
    expect(result.value).toEqual(expectResult)
  })
})