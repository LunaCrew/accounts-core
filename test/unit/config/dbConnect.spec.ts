import connectDatabase from 'src/config/dbConnect'

describe.only(':: Config :: DbConnect ::', () => {
  it('should call connectDatabase()', () => {
    const message = connectDatabase()
    expect(message).toHaveBeenCalled
  })
})