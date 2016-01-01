#!/usr/bin/env node

"use strict"





const constants = require('./constants')

const crypto    = require("crypto")
const bignum    = require("bignum")
const log       = console.log





// map a base10 string onto another character set.
const convertToCharset = function (str, charset) {

	if (toString.call(str) !== '[object String]') {

		log(TypeError('str must be a string.').toString( ))
		process.exit(1)

	}

	if (toString.call(charset) !== '[object String]') {

		log(TypeError('charset must be a string.').toString( ))
		process.exit(1)

	}

	if (charset.length < 1) {

		log(RangeError('charset must have at least one character.').toString( ))
		process.exit(1)

	}

	var digits  = [ ]
	var num     = bignum(str, 16)
	var charset = charset.split('')

	while (num.gt(0)) {

		var ith = num.mod(charset.length).toNumber( )
		digits  = digits.concat([ charset[ith] ])
		num     = num.div(charset.length)

	}

	return digits.join('')
}




// convert a base10 string to an alphanumeric string.
const convertToBase62 = function (str) {
	return convertToCharset(str, constants.charset.alphanumbers)
}





const callCrypto = function (master, salt, rounds, bits) {
	return crypto.pbkdf2Sync(master, salt, rounds, bits) // does this need to be syncronous?
}





const deriveKeys = function (args) {
	/*
	generate output key.

	note on the '6 x len' step:

	six x len is never an underestimation of the number of bits needed, but is sometimes
	an overestimation. Converting between hex and base62 can produce strings of varying length,
	so unneeded bits are just truncated.

	log(62) / log(2) ~ 6 bits per base62-digit.
	*/

	// -- the length 'bits' gives the nubmer of bits.
	const digested  = callCrypto(
		args.master,
		args.salt,
		args.rounds,
		6 * args.len
	)

	var converted =
		convertToBase62(digested.toString('hex'))
		.slice(0, args.len)

	return converted
}




module.exports = deriveKeys
