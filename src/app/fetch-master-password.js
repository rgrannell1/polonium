
// "use strict"

const readline = require('readline')
const stream = require('stream')

const constants = require('../commons/constants')

const mutedStdout = stream.Writable({
  write: (chunk, encoding, callback) => {
    callback()
  }
})

const reader = readline.createInterface({
  input: process.stdin,
  output: mutedStdout,
  terminal: true
})

const fetchMasterPassword = verify => {
  return new Promise((resolve, reject) => {
    console.log(constants.display.ENTER_PASSWORD)

    reader.question('', firstPassword => {
      if (verify) {
        console.log(constants.display.CONFIRM_PASSWORD)

        reader.question('', secondPassword => {
          if (firstPassword !== secondPassword) {
            reject(new Error(`${constants.errorCodes.MISMATCHED_PASSWORD}: passwords did not match.`))
          }

          reader.close()
          resolve(firstPassword)
        })
      } else {
        reader.close()
        resolve(firstPassword)
      }
    })
  })
}

module.exports = fetchMasterPassword
