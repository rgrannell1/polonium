#!/usr/bin/env node

var crypto = require("crypto")
var bases  = require("bases")
var bignum = require("bignum")

const convertToCharset = function (num, charset) {

	var digits = []
	num = bignum(num)

	while (num.gt(0)) {
		var ith = num.mod(charset.length).toNumber()

		digits = digits.concat([ charset[ith] ])
		num = num.div(charset.length)
	}

	converted = digits.join('')
	return converted
}




const lengthInBase = function (args) {
	/*
	find out the length of a number in another base.

	This code will be a lot nicer when node.js finally supports for of.
	*/

	var bases = ['fromBase', 'toBase']

	// test that the bases aren't NaN

	for (var key in args) {
		if (!args.hasOwnProperty(key)) {
			continue
		}
		console.assert(
			args[key] === args[key], (key + ' must not be NaN').red)
	}

	// test that both bases are larger than one
	for (var ith in bases) {
		if (!bases.hasOwnProperty(ith)) {
			continue
		}

		var key = bases[ith]

		console.assert(
			args[key] > 1, (key + ' must be larger than one.').red)
	}

	bignum('10000').log(1000)

	// test that length is larger than zero

	console.assert(
		args.length >= 1, "length must be larger or equal to one.".red)

	// test that the bases are both round numbers

	for (var key in args) {
		if (!args.hasOwnProperty(key)) {
			continue
		}
		console.assert(
			Math.round(args[key]) === args[key] , (key + ' must be a round number').red)
	}



	return Math.floor(args.length *  Math.log(args.fromBase) / Math.log(args.toBase)) + 1
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
		'abcdefghijklmnopqrstuvwxyx' +
		'ABCDEFGHIJKLMNOPQRSTUVWXYX' +
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
