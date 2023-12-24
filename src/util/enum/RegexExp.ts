enum RegexExp {
  DISPLAY_NAME = '^([A-Z][a-z]*)(\\s[A-Z][a-z]*\\.?)*$',
  PASSWORD = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$'
}

export default RegexExp
