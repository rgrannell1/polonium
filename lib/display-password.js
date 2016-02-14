
"use strict"





const constants        = require("./commons/constants.js")
const shannonEntropyOf = require("./shannon-entropy-of.js")




const displayPassword = { }

displayPassword.create = derivedKey => {

	const entropy = shannonEntropyOf(derivedKey.length, constants.bases.outputBase)
	const message = `# bits of entropy:${entropy} (recommended: >= 80 bits)`

	console.log(message[ entropy > 80 ? 'green' : 'red' ])
	console.log(derivedKey)

}

displayPassword.get = derivedKey => {

	console.log(derivedKey)

}





module.exports = displayPassword
