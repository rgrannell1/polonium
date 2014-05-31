#!/usr/bin/env node

var crypto = require("crypto")
var bases  = require("bases")
var bignum = require("bignum")

const convertToCharset = function (num, charset) {
	/*
	string x [string] -> string
	map a base10 string onto another character set.
	*/

	var digits = []
	num = bignum(num)

	while (num.gt(0)) {

		var ith = num.mod(charset.length).toNumber()
		digits  = digits.concat([ charset[ith] ])
		num     = num.div(charset.length)

	}

	return digits.join('')
}




const lengthInBase = function (args) {
	/*
	{length: number, fromBase: number, toBase: number} -> number

	find out the length of a number in another base.
	*/

	;['length', 'fromBase', 'toBase'].map(function (key) {

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
		args.length >= 1,
		"length must be larger or equal to one.".red)

	var length   = args.length
	var fromBase = args.fromBase
	var toBase   = args.toBase

	return Math.floor(length *  Math.log(fromBase) / Math.log(toBase)) + 1
}







const deriveKeys = function (args) {
	/*
	generate the output password.
	*/

	digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		lengthInBase({
			length  : args.length,
			fromBase: 62,
			toBase  : 16
		})
	)

	const alphanumbers =
		'abcdefghijklmnopqrstuvwxyx' + 'ABCDEFGHIJKLMNOPQRSTUVWXYX' +
		'0123456789'

	console.assert(alphanumbers.length === 26 + 26 + 10)

	converted = convertToCharset(digested.toString(), alphanumbers)

	console.assert(
		args.length === converted.length,
		('base62-conversion failed').red)

	return converted
}

module.exports = {
	deriveKeys      : deriveKeys,
	lengthInBase    : lengthInBase,
	convertToCharset: convertToCharset
}
