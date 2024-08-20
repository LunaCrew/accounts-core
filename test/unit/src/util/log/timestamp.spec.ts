import formatTimestamp from 'src/util/log/timestamp'

describe('Timestamp', () => {
  it('should return formatted timestamp', () => {
    const date = new Date()
    const pattern = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\sGMT[+-]?\d*/

    expect(formatTimestamp(date)).toMatch(pattern)
  })
})
