enum CustomErrorMessage {
  BAD_REQUEST = '400 - Bad Request',
  LOGIN_FAILED = '400 - Login Failed - Invalid Credentials',
  AUTH_NOT_PROVIDED = '400 - No token provided',
  USER_ALREADY_DISABLED = '400 - User already disabled',
  USER_ALREADY_VERIFIED = '400 - User already verified',
  INVALID_TOKEN = '400 - Invalid Token',
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
