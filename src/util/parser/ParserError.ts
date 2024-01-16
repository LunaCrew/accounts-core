import HttpStatusCode from '../enum/HttpStatusCode'

class ParserError {
  static http = (code: HttpStatusCode, message: string = ''): object => {
    const result = {      
      code: parseInt(code),
      error: Object.keys(HttpStatusCode)[Object.values(HttpStatusCode).indexOf(code)],
      details: message
    }

    return result
  }
}

export default ParserError
