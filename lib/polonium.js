#!/usr/bin/env node

const doc = [
	"Usage:",
	"    bi create <modifier> [--length=<num>] [--rounds=<num>] [-b | --backup=<str>] [-s | --silent]",
	"    bi get <modifier> [--length=<num>] [--rounds=<num>] [-s | --silent]",
	"    bi (-h | --help | --version)",
	"",
	"Arguments:",
	"    <modifier>      The unique p",
	"",
	"Options:",
	"    --length=<num>  [default: 25] The length of the new output password.",
	"                    Longer passwords are more secure.",
	"    --rounds=<num>  [default: 1000000] The number of rounds of hashing to use.",
	"    --backup=<str>  Should the arguments used to create the new password?",
	"    --version       Show the current version number.",
].
join('\n')

const docopt       = require("docopt").docopt
const getPassword  = require("./getPassword.js")
const hashPassword = require("./hashPassword.js")

const args = docopt(doc)

const main = function (args) {
	/*

	*/

	;["modifier", "length", "rounds", "backup"].map(function (prop) {

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

		base62password = hashPassword({
			rounds:   parseInt(args.rounds, 10),
			length:   parseInt(args.length, 10),

			modifier: args.modifier,
			master:   args.master
		})

		// console.log without the terminal newline.
		console.log(base62password)

	})
}

main({
	modifier: args["<modifier>"],
	length:   args["--length"],
	rounds:   args["--rounds"],
	backup:   args["--backup"],

	create:   args["create"],
	get:      args["get"],
})
