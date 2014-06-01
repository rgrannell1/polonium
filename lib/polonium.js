#!/usr/bin/env node

const doc = [
	"Usage:",
	"    bi create <salt> [--len=<num>] [--rounds=<num>]",
	"    bi get <salt> [--len=<num>] [--rounds=<num>]",
	"    bi (-h | --help | --version)",
	"",
	"Arguments:",
	"    <salt>      A string unique to a particular application or website.",
	"",
	"Options:",
	"    --len=<num>     [default: 20] The length of the new output password.",
	"                    Longer passwords are more secure.",
	"    --rounds=<num>  [default: 1000000] The number of rounds of hashing to use.",
	"                    More rounds make brute force attacks more costly for the attacker.",
	"    --version       Show the current version number.",
].
join('\n')

const docopt           = require("docopt").docopt
const getPassword      = require("./get-password.js")

const deriveKeys       = require("./derive-keys.js")
const entropyOf        = require("./entropy-of.js")

const args = docopt(doc)






const main = function (args) {
	/*
	The main function. Takes arguments from the command line.
	*/

	// -- check that each value has non-zero length.
	;["salt", "len", "rounds"].map(function (prop) {

		if (args[prop].len === 0) {
			throw RangeError("the argument matching '" + prop + "' cannot be length-zero.")
		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	;["len", "rounds"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			throw TypeError("the argument matching '" + prop + "' must be coercible to integer.")
		}
		if (!(num > 0)) {
			throw RangeError("the argument matching '" + prop + "' must be a positive number.")
		}

		if (Math.round(num) !== num) {
			throw RangeError("the argument matching '" + prop + "' must be a round number.")
		}

	})

	const isNewPassword = args.create === true

	getPassword(isNewPassword, function (master) {

		// -- new output key.
		base62password = deriveKeys({
			rounds: parseInt(args.rounds, 10),
			len   : parseInt(args.len, 10),

			salt  : args.salt,
			master: master
		})

		if (isNewPassword) {
			// -- show it's entropy.

			var message =
				'# bits of entropy: ' + entropyOf(base62password.length, 62) +
				' (recommended: >= 80 bits)'

			console.log(message)
		}

		console.log(base62password)

	})
}






main({
	salt    : args["<salt>"],
	len     : args["--len"],
	rounds  : args["--rounds"],

	create  : args["create"],
	get     : args["get"],
})
