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
	{num: bigNumber, fromBase: number, toBase: number} -> number

	find out the length of a number in another base.
	*/

	;['num', 'fromBase', 'toBase'].map(function (key) {

		console.assert(
			args[key] === args[key],
			(key + ' must not be NaN').red)

		console.assert(
			Math.round(args[key]) === args[key] ,
			(key + ' must be a round number').red)

	})

	;['fromBase', 'toBase'].map(function (key) {

		console.assert(
			args[key] > 1,
			(key + ' must be larger than one.').red)

	})

	console.assert(
		args.len >= 1,
		"len must be larger or equal to one.".red)

	var len   = args.len
	var fromBase = args.fromBase
	var toBase   = args.toBase

	var digits = 1

	while () {
		digits++
	}

	return digits
}







const deriveKeys = function (args) {
	/*
	{master: string, salt: string, round: number, len: number} -> string

	generate the output password.
	*/

	digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		lengthInBase({
			len  : args.len,
			fromBase: 62,
			toBase  : 16
		})
	)

	const alphanumbers =
		'abcdefghijklmnopqrstuvwxyx' + 'ABCDEFGHIJKLMNOPQRSTUVWXYX' + '0123456789'

	console.assert(
		alphanumbers.length === 26 + 26 + 10)

	converted = convertToCharset(digested.toString(), alphanumbers)

	console.assert(
		args.len === converted.length,
		('base62-conversion failed').red)

	return converted
}







module.exports = {
	deriveKeys      : deriveKeys,
	lengthInBase    : lengthInBase,
	convertToCharset: convertToCharset
}
