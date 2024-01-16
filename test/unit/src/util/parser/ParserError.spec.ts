import ParserError from 'src/util/parser/ParserError'
import HttpStatusCode from 'src/util/enum/HttpStatusCode'

describe(':: Util :: Log :: ParserError ::', () => {
  it('should parse a http error', () => {
    const code = HttpStatusCode.BAD_REQUEST
    const message = 'Bad request error'
    const expected = {
      code: parseInt(code),
      error: Object.keys(HttpStatusCode)[Object.values(HttpStatusCode).indexOf(code)],
      details: message
    }

    const result = ParserError.http(code, message)

    expect(result).toEqual(expected)
  })
})