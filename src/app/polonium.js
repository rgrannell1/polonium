#!/usr/bin/env node

'use strict'

const plib = require('polonium')

const report = require('./report')
const fetchMasterPasswords = require('./fetch-master-password')

const polonium = async rawArgs => {
  const args = polonium.preprocess(rawArgs)

  try {
    const masterPassword = await fetchMasterPasswords(args.verifyPassword)
    const password = await plib.polonium({
      salt: args.salt,
      len: args.len,
      rounds: args.rounds,
      digest: args.digest,
      password: masterPassword
    })

    return report.password(password, args)
  } catch (err) {
    console.log(err)
    report.error(err)
  }
}

polonium.preprocess = rawArgs => {
  const args = {
    salt: rawArgs['<salt>'],
    digest: rawArgs['--digest'],
    verifyPassword: rawArgs.create === true
  }

  try {
    args.len = parseInt(rawArgs['--len'], 10)
    args.rounds = parseInt(rawArgs['--rounds'], 10)

    if (rawArgs['--line']) {
      args.line = true
    }
    if (rawArgs['--indices']) {
      args.indices = rawArgs['--indices'].split(/\s*,\s*/g).map(index => {
        return parseInt(index)
      })
    } else {
      args.indices = null
    }
  } catch (err) {
    args.len = null
    args.rounds = null
  }

  return args
}

module.exports = polonium
