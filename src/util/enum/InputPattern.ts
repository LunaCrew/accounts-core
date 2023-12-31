class InputPattern {
  static PASSWORD = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])')
  static DATE_TIME_TIMEZONE = new RegExp('^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})(([+-]\\d{4})|Z|z)$')
}

export default InputPattern
