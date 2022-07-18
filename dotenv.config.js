const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

module.exports = function({ dotenv, paths }) {
  const envVarsArray = [...paths]
    .reverse()
    .map(path => {
      const parsed = dotenv.config({ path })
      return dotenvExpand(parsed).parsed
    })

  return envVarsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}