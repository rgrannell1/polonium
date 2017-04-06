
//"use strict"






const os        = require('os')
const colours   = require('colors')
const readline  = require('readline')
const stream    = require('stream')
const read      = require('read')

const constants = require('../commons/constants')

const mutedStdout = stream.Writable({
	write: (chunk, encoding, callback) => {


		callback( )

	}
})

const reader = readline.createInterface({
	input:    process.stdin,
	output:   mutedStdout,
	terminal: true
})





const fetchMasterPassword = verify => {

	return new Promise((res, rej) => {

		console.log(constants.display.ENTER_PASSWORD)

		reader.question('', firstPassword => {

			if (verify) {

				console.log(constants.display.CONFIRM_PASSWORD)

				reader.question('', secondPassword => {

					if (firstPassword !== secondPassword) {
						rej(new Error(`${constants.errorCodes.MISMATCHED_PASSWORD}: passwords did not match.`))
					}

					reader.close( )
					res(firstPassword)

				})

			} else {

				reader.close( )
				res(firstPassword)

			}

		})

	})

}





module.exports = fetchMasterPassword
