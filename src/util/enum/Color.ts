enum EnumColor {
  base = '\x1b[0m', // Reset
  black = '\x1b[30m', // #000000
  cyan = '\x1b[36m', // #00FFFF
  red = '\x1b[31m', // #FF0000
  blue = '\x1b[34m', // #0000FF
  yellow = '\x1b[33m', // #FFFF00
  green = '\x1b[32m', // #008000
  white = '\x1b[37m', // #FFFFFF
  blackOnWhite = '\x1b[30m\x1b[47m', // #000000 on #FFFFFF
  whiteOnGreen = '\x1b[37m\x1b[42m', // #FFFFFF on #008000
  whiteOnRed = '\x1b[37m\x1b[41m', // #FFFFFF on #FF0000
  whiteOnBlue = '\x1b[37m\x1b[44m', // #FFFFFF on #0000FF
  whiteOnYellow = '\x1b[37m\x1b[43m', // #FFFFFF on #FFFF00
}

export default EnumColor
