#!/usr/bin/env node

var crypto = require("crypto")
var bases  = require("bases")
var bignum = require("bignum")




const convertToCharset = function (str, charset) {
	/*
	string x [string] -> string
	map a base10 string onto another character set.
	*/

	var digits = []
	num = bignum(str)
	charset = charset.split('')

	while (num.gt(0)) {

		var ith = num.mod(charset.length).toNumber()
		digits  = digits.concat([ charset[ith] ])
		num     = num.div(charset.length)

	}

	return digits.join('')
}




convertToBase62 = function (str) {
	/*
	string -> string
	convert a base10 string to an alphanumeric string.
	*/

	const alphanumbers =
		'0123456789' + 'ABCDEFGHIJKLMNOPQRSTUVWXYX' + 'abcdefghijklmnopqrstuvwxyx'

	return convertToCharset(str, alphanumbers)
}





const deriveKeys = function (args) {
	/*
	{master: string, salt: string, round: number, len: number} -> string

	generate the output password.
	*/

	/*
	log(62) / log(2) ~ 6 bits per base62-digit.

	six x len is never an underestimation of the number of bits needed, sometimes
	an overestimation.
	*/

	const bitsPerDigit = 6 * args.len

	// -- the length 'bitsPerDigit' gives the nubmer of bits.
	digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		bitsPerDigit
	)

	converted =
		convertToBase62(digested.toString())
		.slice(0, args.len)

	if (args.len !== converted.length) {
		throw RangeError('base62-conversion failed; the output string had incorrect length.'.red)
	}

	return converted
}




module.exports = {
	deriveKeys      : deriveKeys,
	convertToCharset: convertToCharset
}
