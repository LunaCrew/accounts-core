enum CustomErrorMessage {
  PASSWORD = '"password" must have uppercase and lowercase letters, numbers and special characters',
  DATE_TIME_TIMEZONE = '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>',
  VALIDATION = 'Validation Error',
  LOGIN_FAILED = 'Login Failed - Invalid Credentials',
  NOT_FOUND = 'User Not Found',
  CONFLICT = 'User Already Exists',
  CONFLICT_EMAIL = 'Email Already in Use',
  CONFLICT_ID = 'ID Already in Use',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  SERVICE_UNAVAILABLE = 'Service Unavailable',
  GENERIC = 'Something went wrong'
}

export default CustomErrorMessage
