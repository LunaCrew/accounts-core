import { GeneralUserQuery } from 'src/types/Query'

describe('GeneralUserQuery', () => {
  it('should allow object type', () => {
    const user: GeneralUserQuery = { name: 'John', age: 30 }
    expect(user).toMatchObject({ name: 'John', age: 30 })
  })

  it('should allow null type', () => {
    const user: GeneralUserQuery = null
    expect(user).toBeNull()
  })

  it('should allow undefined type', () => {
    const user: GeneralUserQuery = undefined
    expect(user).toBeUndefined()
  })
})
