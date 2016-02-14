#!/usr/bin/env node

"use strict"





var prompt = require("prompt")





const getPassword = (verify, callback) => {
	/*
		grab the password from the console.
	*/

	prompt.start( )
	prompt.message = "[polonium]".green

	// -- prompt for a master password
	var promptArgs = [{
		name       : 'requested',
		type       : 'string',
		description: "enter your master password",
		required   : true,
		hidden     : true
	}]

	if (verify === true) {
		// -- confirm that you entered the correct password.

		promptArgs = promptArgs.concat( [{
			name       : 'confirmation',
			type       : 'string',
			description: 'confirm your master password',
			required   : true,
			hidden     : true
		}] )
	}

	// -- grab the user passwords.

	prompt.get(promptArgs, (err, result) => {

		if (err) {

			process.stderr.write('\nerror:'.red + ' could not read arguments\n')
			process.exit(1)

		} else if (verify === true && result.requested !== result.confirmation) {

			process.stderr.write('error:'.red + " passwords were not identical\n")
			process.exit(1)

		}

		return callback(result.requested)

	})

}





module.exports = getPassword
