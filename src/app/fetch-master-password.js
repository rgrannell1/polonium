
// "use strict"

const readline = require('readline')
const stream = require('stream')

const constants = require('../commons/constants')

/**
 * Create a dummy writeable stream.
 */
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

/**
 * Read and possibly verify a password.
 *
 * @param {boolean} verify should the password be verified?
 *
 * @returns {Promise<string>} a password.
 */
const fetchMasterPassword = verify => {
  return new Promise((resolve, reject) => {
    // -- prompt for a password.
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
