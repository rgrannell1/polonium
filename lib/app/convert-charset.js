
"use strict"





const bigInt = require("big-integer")





// map a base10 string onto another character set.

const convertCharset = function (charset, str) {

	convertCharset.precond(charset, str)

	var digits = [ ]
	var num    = bigInt(str, 16)
	var chars  = charset.split('')

	while (num.gt(0)) {

		var ith = num.mod(chars.length)

		digits  = digits.concat([ chars[ith] ])
		num     = num.divide(chars.length)

	}

	return digits.join('')
}

convertCharset.precond = (charset, str) => {

	if (Object.prototype.toString.call(str) !== '[object String]') {

		process.stderr.write('internal error: str must be a string.')
		process.exit(1)

	}

	if (Object.prototype.toString.call(charset) !== '[object String]') {

		process.stderr.write('internal error: charset must be a string.')
		process.exit(1)

	}

	if (charset.length < 1) {

		process.stderr.write('internal error: charset must have at least one character.')
		process.exit(1)

	}

}




module.exports = convertCharset
