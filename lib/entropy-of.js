
const log2 = function (num) {
	return Math.log(num) / Math.log(2)
}

const entropyOf = function (length, base) {
	return Math.floor(length * log2(base))
}

module.exports = entropyOf
