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




convertToAlphanumeric = function (str) {

	const alphanumbers =
		'abcdefghijklmnopqrstuvwxyx' + 'ABCDEFGHIJKLMNOPQRSTUVWXYX' + '0123456789'

	return convertToCharset(str, alphanumbers)
}





const deriveKeys = function (args) {
	/*
	{master: string, salt: string, round: number, len: number} -> string

	generate the output password.
	*/

	/*
	keep it simple.

	generate more bits than needed, discard the rest.
	*/

	const upperBound = args.len * 5

	digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		upperBound
	)

	converted =
		convertToAlphanumeric(digested.toString())
		.slice(0, args.len)

	if (args.len !== converted.length) {
		throw RangeError('base62-conversion failed'.red)
	}

	return converted
}







module.exports = {
	deriveKeys      : deriveKeys,
	convertToCharset: convertToCharset
}
