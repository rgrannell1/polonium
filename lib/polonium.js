#!/usr/bin/env node

const doc = [
	"Usage:",
	"    bi create <context> [--length=<num>] [--rounds=<num>] [-b | --backup=<str>]",
	"    bi get <context> [--length=<num>] [--rounds=<num>]",
	"    bi (-h | --help | --version)",
	"",
	"Arguments:",
	"    <context>      A string unique to a particular application or website.",
	"",
	"Options:",
	"    --length=<num>  [default: 20] The length of the new output password.",
	"                    Longer passwords are more secure.",
	"    --rounds=<num>  [default: 10000] The number of rounds of hashing to use.",
	"    --backup=<str>  Should the arguments used to create the new password?",
	"    --version       Show the current version number.",
].
join('\n')

const docopt       = require("docopt").docopt
const getPassword  = require("./get-password.js")
const deriveKeys = require("./derive-keys.js")
const entropyOf    = require("./entropy-of.js")

const args = docopt(doc)

const main = function (args) {
	/*

	*/

	;["context", "length", "rounds", "backup"].map(function (prop) {

		if (args[prop].length === 0) {
			throw "the argument matching '" + prop + "' cannot be length-zero."
		}
	})

	;["length", "rounds"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			throw "the argument matching '" + prop + "' must be coercible to integer."
		}
		if (!(num > 0)) {
			throw "the argument matching '" + prop + "' must be a positive number."
		}
	})

	const shouldVerify = args.create === true

	getPassword(shouldVerify, function (master) {

		base62password = deriveKeys({
			rounds:   parseInt(args.rounds, 10),
			length:   parseInt(args.length, 10),

			context: args.context,
			master:   master
		})

		// console.log without the terminal newline.

		if (shouldVerify) {
			console.log(
				'# bits of entropy: ' + entropyOf(base62password.length, 62) +
				' (recommended: >= 80 bits)')
		}

		console.log(base62password)

	})
}

main({
	context: args["<context>"],
	length:   args["--length"],
	rounds:   args["--rounds"],
	backup:   args["--backup"],

	create:   args["create"],
	get:      args["get"],
})
