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




const lengthInBase = function (args) {
	/*
	{len: number, fromBase: number, toBase: number} -> number

	find out the length of a number in another base.
	*/

	;['num', 'fromBase', 'toBase'].map(function (key) {

		if (args[key] !== args[key]) {
			throw TypeError((key + ' must not be NaN').red)
		}

		if (Math.round(args[key]) !== args[key]) {
			throw RangeError((key + ' must be a round number').red))
		}

	})

	;['fromBase', 'toBase'].map(function (key) {

		if (args <= 0) {
			throw RangeError((key + ' must be larger than one.').red))
		}

	})

	if (args.len <= 0) {
		throw RangeError("len must be larger or equal to one.".red)
	}

	var len      = args.len
	var fromBase = args.fromBase
	var toBase   = args.toBase

	/*
	keep it simple.

	I'm finding it difficult to nail down an exact function,
	so use the upper limit that four times the base62 length is always sufficient
	to draw bits from.

	*/

	4 * len
}







const deriveKeys = function (args) {
	/*
	{master: string, salt: string, round: number, len: number} -> string

	generate the output password.
	*/

	/*
	keep it simple.

	generate more bits than needed, discard the rest.
	Verify correctness by testing.
	*/

	const upperBound = args.len * 5

	digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		upperBound
	)

	const alphanumbers =
		'abcdefghijklmnopqrstuvwxyx' + 'ABCDEFGHIJKLMNOPQRSTUVWXYX' + '0123456789'

	converted =
		convertToCharset(digested.toString(), alphanumbers)
		.slice(0, args.len)

	if (args.len !== converted.length) {
		throw RangeError('base62-conversion failed'.red)
	}

	return converted
}







module.exports = {
	deriveKeys      : deriveKeys,
	lengthInBase    : lengthInBase,
	convertToCharset: convertToCharset
}
