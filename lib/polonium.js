#!/usr/bin/env node

const doc = [
	"Usage:",
	"    polo create <salt> [--len=<num>] [--rounds=<num>]",
	"    polo get <salt> [--len=<num>] [--rounds=<num>]",
	"    polo (-h | --help | --version)",
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
	"    bbMCnLuy8a7450xbSScG",
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
	"                    of your password. It is not absolutely critical that your salt be kept secret.",
	"",
	"Options:",
	"    --len=<num>     [default: 20] The length of the new output password.",
	"                    Longer passwords are more secure.",
	"    --rounds=<num>  [default: 1000000] The number of rounds of hashing to use.",
	"                    More rounds make brute force attacks more costly for the attacker.",
	"                    and increases the security of your password.",
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
		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	;["len", "rounds"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			log(TypeError("the argument matching '" + prop + "' must be coercible to integer.").toString())
		}
		if (!(num > 0)) {
			log(RangeError("the argument matching '" + prop + "' must be a positive number.").toString())
		}

		if (Math.round(num) !== num) {
			log(RangeError("the argument matching '" + prop + "' must be a round number.").toString())
		}

	})

	// -- ensure that length is larger than one
	if (args.len <= 1) {
		log(RangeError("the argument matching 'len' must larger than one.".red).toString())
	}

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
