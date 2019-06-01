
'use strict'

const error = err => {
  console.error(err.message)
}

const password = password => {
  console.error(password)
}

module.exports = { error, password }
