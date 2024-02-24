class HttpStatus {
  static readonly code = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    CONNECTION_TIMED_OUT: 522
  }

  static keys(value: string | number): string {
    return Object.keys(this)[Object.values(this).indexOf(value)]
  }
}

export default HttpStatus
