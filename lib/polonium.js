#!/usr/bin/env node

const doc = [
	"Usage:",
	"    polo create <salt> [--len=<num>] [--rounds=<num>]",
	"    polo get <salt> [--len=<num>] [--rounds=<num>]",
	"    polo (-h | --help | --version)",
	"",
	"Version:",
	"",
	"v0.3.1",
	"",
	"Description:",
	"",
	"Polonium is a stateless password manager based on PBKDF2. Polonium is 'stateless' in that",
	"it uses a deterministic function to create and retrieve passwords; for any particular input it",
	"always generates a particular password. For example, ",
	"",
	"    polo get a (with password 'a')",
	"",
	"always generates the new password",
	"",
	"    fXWX6PmmyxtLU2WWl5vx",
	"",
	"This means that if you remember a master password, the application you use the password for, and any ",
	"additional arguments you pass to polonium you can retrieve your generated passwords.",
	"",
	"Polonium generates base62 alphanumeric passwords. These have higher entropy than standard encodings like",
	"base16 and binary, and are more likely to be accepted by a website than base64 passwords.",
	"",
	"When creating a password it is important you create a password with at least 80 bits of entropy, ",
	"preferably even higher. This makes your generated password resistant to being cracked. The same requirement",
	"is even more true of your master password.",
	"",
	"Polonium is to a degree a 'garbage-in, garbage-out' program. If you use 'password' as your master password, ",
	"your derived passwords will be easy to guess for attackers who know the password was made with polonium. If ",
	"they do not know, however, your derived passwords will still be secure, even though they were made by a bad ",
	"master password.",
	"",
	"Polonium runs slowly for a reason; the most convenient way to protect your password from ",
	"being exhaustively guessed (by running through each possible password) is to make each guess slow.",
	"",
	"Arguments:",
	"    <salt>          A string unique to a particular application or website.",
	"                    Making the salt unpredicatable & secret increases the security ",
	"                    of your password. It is not critical that your salt be kept secret; you can use",
	"                    the name of an application or site as your salt.",
	"",
	"Options:",
	"    --len=<num>     [default: 20] The length of the new output password.",
	"                    Longer passwords are more secure. For memorisability it is not recommended",
	"                    to change this parametre unless a shorted password is required by an app."
	"    --rounds=<num>  [default: 1000000] The number of rounds of hashing to use.",
	"                    More rounds make brute force attacks more costly for the attacker.",
	"                    and increases the security of your password. It is highly unrecommended ",
	"                    to lower this value below 100,000."
	"    --version       Show the current version number.",
].
join('\n')

const docopt      = require("docopt").docopt
const getPassword = require("./get-password.js")

const deriveKeys  = require("./derive-keys.js")
const entropyOf   = require("./entropy-of.js")
const log         = console.log

const args = docopt(doc)






const main = function (args) {
	/*
	The main function. Takes arguments from the command line.
	*/

	// -- check that each value has non-zero length.
	;["salt", "len", "rounds"].map(function (prop) {

		if (args[prop].len === 0) {
			log(RangeError("the argument matching '" + prop + "' cannot be length-zero.").toString())
			process.exit(1)
		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	;["len", "rounds"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			log(TypeError("the argument matching '" + prop + "' must be coercible to integer.").toString())
			process.exit(1)
		}
		if (!(num > 0)) {
			log(RangeError("the argument matching '" + prop + "' must be a positive number.").toString())
			process.exit(1)
		}

		if (Math.round(num) !== num) {
			log(RangeError("the argument matching '" + prop + "' must be a round number.").toString())
			process.exit(1)
		}

	})

	// -- ensure that length is larger than one
	if (args.len <= 1) {
		log(RangeError("the argument matching 'len' must larger than one.".red).toString())
		process.exit(1)
	}

	// -- check whether using the 'get' or 'create' command.
	const isNewPassword = args.create === true

	getPassword(isNewPassword, function (master) {

		// -- new output key.
		derivedKey = deriveKeys({
			rounds: parseInt(args.rounds, 10),
			len   : parseInt(args.len, 10),

			salt  : args.salt,
			master: master
		})

		if (isNewPassword) {
			// -- show it's entropy.

			const entropy = entropyOf(derivedKey.length, 62)
			const message = '# bits of entropy: ' + entropy + ' (recommended: >= 80 bits)'

			if (entropy > 80) {
				log(message.green)
			} else {
				log(message.red)
			}

		}

		log(derivedKey)

	})
}






main({
	salt    : args["<salt>"],
	len     : args["--len"],
	rounds  : args["--rounds"],

	create  : args["create"],
	get     : args["get"],
})






module.exports = {
	main: main
}
