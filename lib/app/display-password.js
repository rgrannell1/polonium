
"use strict"





const constants        = require("../commons/constants.js")
const shannonEntropyOf = require("../commons/shannon-entropy-of.js")




const displayPassword = { }





displayPassword.create = derivedKey => {

	const entropy = shannonEntropyOf(derivedKey.length, constants.bases.outputBase)
	const message = `# bits of entropy:${entropy} (recommended: >= 80 bits)`

	const messageColour = entropy > constants.lowEntropyLimit
		? constants.colourFlags.highEntropy
		: constants.colourFlags.lowEntropy

	constants.isWindows
		? console.log(message)
		: console.log(message[messageColour])

	console.log(derivedKey)

}

displayPassword.get = derivedKey => {

	console.log(derivedKey)

}





module.exports = displayPassword
