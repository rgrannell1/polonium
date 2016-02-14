#!/usr/bin/env node

"use strict"





const getPassword      = require("./get-password.js")

const deriveKeys       = require("./derive-keys.js")
const shannonEntropyOf = require("./shannon-entropy-of.js")





const main = args => {

	main.preprocess(args)

	const isNewPassword = args.create === true

	getPassword(isNewPassword, master => {

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

			console.log(message[ entropy > 80 ? 'green' : 'red' ])

		}

		console.log(derivedKey)

	})
}

main.preprocess = args => {

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
	requiredNatural.forEach(function (prop) {

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

		process.stderr.write("the argument matching 'len' must larger than one.".red)

		process.exit(1)

	}


}





module.exports = main
