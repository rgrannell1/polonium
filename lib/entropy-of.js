
const entropyOf = function (length, base) {
	return Math.floor(length * Math.log(base, 2))
}

module.exports = entropyOf
