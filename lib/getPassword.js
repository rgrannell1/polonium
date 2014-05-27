#!/usr/bin/env node

const crypto = require("crypto")

const getPassword = function (verify, callback) {
	/*
		grab the password from the console.
	*/

	var prompt = require("prompt")

	prompt.start()
	prompt.message = "[polonium]"

	// prompt for a master password
	var promptArgs = [{
		name: 'password1',
		type: 'string',
		description: "enter your master password",
		required: true,
		hidden:   true
	}]

	if (verify === true) {
		// confirm that you entered the correct password.
		promptArgs = promptArgs.concat( [{
			name: 'password2',
			type: 'string',
			description: "confirm your master password",
			required: true,
			hidden:   true
		}] )
	}

	// get the users passwords.
	prompt.get(promptArgs, function (err, result) {

		if (verify === true && result.password1 !== result.password2) {
			throw "passwords were not identical".red
		}

		// don't log the error; not sure what would be shown.
		return err ? console.log('an error occured') : callback(result.password1)
	})

}

module.exports = getPassword
