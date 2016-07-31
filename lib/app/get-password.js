#!/usr/bin/env node

"use strict"





var prompt      = require("prompt")
const constants = require('../commons/constants')





const getPassword = (verify, callback) => {
	/*
		grab the password from the console.
	*/

	prompt.start( )
	prompt.message = constants.isWindows
		? "[polonium]"
		: "[polonium]".green

	// -- prompt for a master password
	var promptArgs = [{
		name:        'requested',
		type:        'string',
		description: "enter your master password",
		required:    true,
		hidden:      true
	}]

	if (verify === true) {
		// -- confirm that you entered the correct password.

		promptArgs = promptArgs.concat( [{
			name:        'confirmation',
			type:        'string',
			description: 'confirm your master password',
			required:    true,
			hidden:      true
		}] )
	}

	// -- grab the user passwords.

	prompt.get(promptArgs, (err, result) => {

		if (err) {

			console.error('error:' + ' could not read arguments')
			process.exit(1)

		} else if (verify === true && result.requested !== result.confirmation) {

			console.error('error:' + " passwords were not identical")
			process.exit(1)

		}

		return callback(result.requested)

	})

}





module.exports = getPassword
