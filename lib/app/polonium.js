#!/usr/bin/env node

"use strict"





const getPassword      = require("./get-password.js")

const deriveKeys       = require("./derive-keys.js")
const displayPassword  = require("./display-password.js")





const polonium = rawArgs => {

	var args = polonium.validate(polonium.preprocess(rawArgs))

	getPassword(args.create, masterPassword => {

		var derivedKey = deriveKeys({

			rounds: parseInt(args.rounds, 10),
			len:    parseInt(args.len,    10),
			salt:   args.salt,
			master:  masterPassword

		})

		displayPassword[args.create ? 'create' : 'get'](derivedKey)

	})

}

polonium.preprocess = rawArgs => {

	return {
		salt:   rawArgs['<salt>'],
		len:    rawArgs['--len'],
		rounds: rawArgs['--rounds'],

		create: rawArgs.create,
		get:    rawArgs.get
	}


}

polonium.validate = args => {

	const requiredNonEmpty = ["salt", "len", "rounds"]
	const requiredNatural  = ["len", "rounds"]

	// -- check that each value has non-zero length.
	requiredNonEmpty.forEach(function (prop) {

		if (args[prop].length === 0) {

			process.stderr.write(`the argument matching "${prop}" cannot be length-zero.`)
			process.exit(1)

		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	requiredNatural.forEach(prop => {

		const num = parseInt(args[prop], 10)

		if (num !== num) {

			process.stderr.write(`the argument matching"${prop}" must be coercible to an integer.`)

			process.exit(1)

		}
		if (num <= 0) {

			process.stderr.write(`the argument matching"${prop}" must be a positive number.`)

			process.exit(1)

		}

		if (Math.round(num) !== num) {

			process.stderr.write(`the argument matching"${prop}" must be a round number.`)

			process.exit(1)

		}

	})

	if (args.len <= 1) {

		process.stderr.write("the argument matching 'len' must larger than one.")

		process.exit(1)

	}

	return args

}





module.exports = polonium
