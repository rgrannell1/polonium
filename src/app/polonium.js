#!/usr/bin/env node

"use strict"





const plib                 = require('polonium')

const report               = require('./report')
const fetchMasterPasswords = require('./fetch-master-password')





const polonium = rawArgs => {

	const args = polonium.preprocess(rawArgs)

	fetchMasterPasswords(args.verifyPassword)
	.then(password => {

		return plib.polonium({
			salt:     args.salt,
			len:      args.len,
			rounds:   args.rounds,
			digest:   args.digest,
			password
		})

	})
	.then(
		report.password)
	.catch(
		report.error)

}

polonium.preprocess = rawArgs => {

	const args = {
		salt:           rawArgs['<salt>'],
		digest:         rawArgs['--digest'],
		verifyPassword: rawArgs.create === true
	}

	try {

		args.len    = parseInt(rawArgs['--len'], 10)
		args.rounds = parseInt(rawArgs['--rounds'], 10)

	} catch (err) {

		args.len    = null
		args.rounds = null

	}

	return args

}





module.exports = polonium
