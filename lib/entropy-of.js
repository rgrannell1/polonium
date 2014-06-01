
const entropyOf = function (len, base) {
	/*
	number x number -> number
	compute the shannon entropy of a password.
	*/

	return Math.floor(len * log2(base))
}

module.exports = entropyOf
