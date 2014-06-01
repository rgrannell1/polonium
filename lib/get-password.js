#!/usr/bin/env node

const crypto = require("crypto")
var prompt   = require("prompt")

const getPassword = function (verify, callback) {
	/*
		grab the password from the console.
	*/

	prompt.start()
	prompt.message = "[polonium]".green

	// -- prompt for a master password
	var promptArgs = [{
		name       : 'password1',
		type       : 'string',
		description: "enter your master password",
		required   : true,
		hidden     : true
	}]

	if (verify === true) {
		// -- confirm that you entered the correct password.

		promptArgs = promptArgs.concat( [{
			name       : 'password2',
			type       : 'string',
			description: "confirm your master password",
			required   : true,
			hidden     : true
		}] )
	}

	// -- grab the user passwords.

	prompt.get(promptArgs, function (err, result) {

		if (err) {
			throw 'an error occured while prompting for arguments.'.red
		}

		if (verify === true && result.password1 !== result.password2) {
			throw "passwords were not identical".red
		}

		return callback(result.password1)
	})

}

module.exports = getPassword
