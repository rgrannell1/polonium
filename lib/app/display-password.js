
"use strict"





require('colors')

const constants        = require("../commons/constants.js")
const shannonEntropyOf = require("../commons/shannon-entropy-of.js")




const displayPassword = { }





displayPassword.create = (derivedKey, indices) => {

	const entropy = shannonEntropyOf(derivedKey.length, constants.bases.outputBase)
	const message = `# bits of entropy:${entropy} (recommended: >= 80 bits)`

	const messageColour = entropy > constants.lowEntropyLimit
		? constants.colourFlags.highEntropy
		: constants.colourFlags.lowEntropy

	constants.isWindows
		? console.log(message)
		: console.log(message[messageColour])

	if (indices) {

		console.log( indices.map(index => {

			const parsedIndex = parseInt(index, 10)

			if (parsedIndex >= derivedKey.length) {
				console.error(`supplied index ${parsedIndex} larger than or equal to the password length (${derivedKey.length})`)
				process.exit(1)
			}

			return derivedKey[parsedIndex]

		}).join('') )

	} else {
		console.log(derivedKey)
	}


}

displayPassword.get = (derivedKey, indices) => {

	if (indices) {

		console.log( indices.map(index => {

			const parsedIndex = parseInt(index, 10)

			if (parsedIndex >= derivedKey.length) {
				console.error(`supplied index ${parsedIndex} larger than the password length (${derivedKey.length})`)
				process.exit(1)
			}

			return derivedKey[parsedIndex - 1]

		}).join('') )

	} else {
		console.log(derivedKey)
	}

}





module.exports = displayPassword
