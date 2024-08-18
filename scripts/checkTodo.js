/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')

const RED = '\x1b[31m'
const YELLOW = '\x1b[1;33m'
const BLUE = '\x1b[1;34m'
const RESET = '\x1b[0m'

const src = './src/'

function searchForTodo(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file)

      fs.stat(filePath, (err, result) => {

        if (err) {
          console.error(err)
          return
        }

        if (result.isDirectory()) {
          searchForTodo(filePath) // search again
        } else if (result.isFile()) {
          readFiles(filePath)
        }
      })
    })
  })
}

function readFiles(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const lines = data.split('\n')

    lines.forEach((line, lineNumber) => {
      if (line.match(/(todo:|TODO:)/g)) {
        console.log(`${RED}TO-DO ${RESET}=> ${BLUE}${filePath} ${YELLOW}(Line ${lineNumber + 1}):${BLUE} ${line.trim()}${RESET}`)
      }

      if (line.match(/(fix:|FIX:)/g)) {
        console.log(`${RED}FIX ${RESET}=> ${BLUE}${filePath} ${YELLOW}(Line ${lineNumber + 1}):${BLUE} ${line.trim()}${RESET}`)
      }
    })
  })
}

searchForTodo(src)
