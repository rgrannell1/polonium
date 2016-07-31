#!/usr/bin/env node

"use strict"





const crypto           = require("crypto")
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
			master: masterPassword,
			digest: args.digest

		})

		displayPassword[args.create ? 'create' : 'get'](derivedKey, args.indices)

	})

}

polonium.preprocess = rawArgs => {

	const processed = {
		salt:    rawArgs['<salt>'],
		len:     rawArgs['--len'],
		rounds:  rawArgs['--rounds'],
		digest:  rawArgs['--digest'],

		create:  rawArgs.create,
		get:     rawArgs.get
	}

	processed.indices = rawArgs['--indices'] ? rawArgs['--indices'].split(',') : undefined

	return processed

}

polonium.validate = args => {

	const requiredNonEmpty = ["salt", "len", "rounds"]
	const requiredNatural  = ["len", "rounds"]

	// -- check that each value has non-zero length.
	requiredNonEmpty.forEach(function (prop) {

		if (args[prop].length === 0) {

			console.error(`the argument matching "${prop}" cannot be length-zero.`)
			process.exit(1)

		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	requiredNatural.forEach(prop => {

		const num = parseInt(args[prop], 10)

		if (num !== num) {

			console.error(`the argument matching"${prop}" must be coercible to an integer.`)

			process.exit(1)

		}
		if (num <= 0) {

			console.error(`the argument matching"${prop}" must be a positive number.`)

			process.exit(1)

		}

		if (Math.round(num) !== num) {

			console.error(`the argument matching"${prop}" must be a round number.`)

			process.exit(1)

		}

	})

	if (args.len <= 1) {

		console.error("the argument matching 'len' must larger than one.")

		process.exit(1)

	}

	if (args.indices) {

		args.indices.forEach((entry, ith) => {

			if (!/^[0-9]+$/g.test(entry)) {

				console.error(`index csv entry #${ith} is not numeric`)
				process.exit(1)

			}

		})

	}

	if (crypto.getHashes( ).indexOf(args.digest) === -1) {

		console.error(`${args.digest} is not a supported hash-algorithm.`)
		process.exit(1)

	}

	return args

}





module.exports = polonium
