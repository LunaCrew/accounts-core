enum CustomErrorMessage {
  PASSWORD = '"password" must have uppercase and lowercase letters, numbers and special characters',
  DATE_TIME_TIMEZONE = '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>',
  BAD_REQUEST = '400 - Bad Request',
  LOGIN_FAILED = '400 - Login Failed - Invalid Credentials',
  AUTH_NOT_PROVIDED = '400 - No token provided',
  AUTH_FAILED = '400 - Authentication Failed',
  UNAUTHORIZED = '401 - Unauthorized',
  FORBIDDEN = '403 - Forbidden',
  NOT_FOUND = '404 - User Not Found',
  CONFLICT = '409 - Conflict',
  CONFLICT_EMAIL = '409 - Email Already in Use',
  CONFLICT_ID = '409 - Id Already in Use',
  INTERNAL_SERVER_ERROR = '500 - Internal Server Error',
  SERVICE_UNAVAILABLE = '503 - Service Unavailable',
  GENERIC = 'Something went wrong'
}

export default CustomErrorMessage
