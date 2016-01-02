#!/usr/bin/env node

"use strict"





const getPassword      = require("./get-password.js")

const deriveKeys       = require("./derive-keys.js")
const shannonEntropyOf = require("./shannon-entropy-of.js")
const log              = console.log





const main = function (args) {

	// -- check that each value has non-zero length.
	;["salt", "len", "rounds"].map(function (prop) {

		if (args[prop].len === 0) {
			log(RangeError(`the argument matching "${prop}" cannot be length-zero.`).toString( ))
			process.exit(1)
		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	;["len", "rounds"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			log(TypeError(`the argument matching"${prop}" must be coercible to an integer.`).toString( ))
			process.exit(1)
		}
		if (!(num > 0)) {
			log(RangeError(`the argument matching"${prop}" must be a positive number.`).toString( ))
			process.exit(1)
		}

		if (Math.round(num) !== num) {

			log(RangeError(`the argument matching"${prop}" must be a round number.`).toString( ))
			process.exit(1)
		}

	})

	// -- ensure that length is larger than one
	if (args.len <= 1) {
		log(RangeError("the argument matching 'len' must larger than one.".red).toString( ))
		process.exit(1)
	}

	// -- check whether using the 'get' or 'create' command.
	const isNewPassword = args.create === true

	getPassword(isNewPassword, function (master) {

		// -- new output key.
		var derivedKey = deriveKeys({

			rounds: parseInt(args.rounds, 10),
			len:    parseInt(args.len,    10),
			salt:   args.salt,
			master: master

		})

		if (isNewPassword) {
			// -- show its entropy.

			const entropy = shannonEntropyOf(derivedKey.length, 62)
			const message = `# bits of entropy:${entropy} (recommended: >= 80 bits)`

			log(message[ entropy > 80 ? 'green' : 'red' ])

		}

		log(derivedKey)

	})
}





module.exports = main
