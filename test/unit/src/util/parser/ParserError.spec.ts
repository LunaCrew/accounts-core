import ParserError from 'src/util/parser/ParserError'
import HttpStatusCode from 'src/util/enum/HttpStatusCode'

describe(':: Util :: Log :: ParserError ::', () => {
  it('should parse a http error', () => {
    const expected = {
      code: 400,
      error: 'BAD_REQUEST',
      details: 'Bad request error'
    }

    const result = ParserError.http(HttpStatusCode.BAD_REQUEST, 'Bad request error')

    expect(result).toEqual(expected)
  })

  it('should parse a http error', () => {
    const expected = {
      code: 400,
      error: 'BAD_REQUEST',
      details: ''
    }

    const result = ParserError.http(HttpStatusCode.BAD_REQUEST)

    expect(result).toEqual(expected)
  })
})