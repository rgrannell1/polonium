
const log2 = function (num) {
	/*
	compute log two of a value. Stopgap for
	ECMAScript 6's Math.log2.
	*/

	return Math.log(num) / Math.log(2)
}

const entropyOf = function (length, base) {
	/*
	compute the shannon entropy of a password.
	*/

	return Math.floor(length * log2(base))
}

module.exports = entropyOf
