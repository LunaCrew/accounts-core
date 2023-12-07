const packageJson = require('../package.json')
const colors = require('colors')

function checkUnauthorizedChars () {
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  }

  const depsArr = Object.values(deps)
  const regex = /^[~^]/
  const isPackageInvalid = depsArr.some((dep) => regex.test(dep))

  if (isPackageInvalid) {
    throw new Error(colors.bold.red('^ and ~ not allowed in package.json'))
  }

  return null
}

checkUnauthorizedChars()