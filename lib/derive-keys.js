#!/usr/bin/env node

var crypto = require("crypto")
var bases  = require("bases")
var bignum = require("bignum")

const convertBase62 = function (num) {
	/*
	convert a number to base-62.
	*/

	var digits = []
	num = bignum(num)

	const charset =
		'abcdefghijklmnopqrstuvwxyz' +
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
		'0123456789'

	console.assert(charset.length === 62)

	while (num.gt(0)) {
		var ith = num.mod(charset.length).toNumber()

		digits = digits.concat([ charset[ith] ])
		num = num.div(charset.length)
	}

	base62num = digits.join('')
	return base62num
}




const lengthInBase = function (length, fromBase, toBase) {
	/*
	find out the length of a number in another base.
	*/

	// test that the bases aren't NaN

	console.assert(
		fromBase !== fromBase, "fromBase must not be NaN".red)

	console.assert(
		toBase !== toBase, "toBase must not be NaN".red)

	console.assert(
		length !== length, "length must not be NaN".red)

	// test that both bases are larger than one

	console.assert(
		fromBase > 1, "fromBase must be larger than one.".red)

	console.assert(
		toBase > 1, "toBase must be larger than one.".red)

	console.assert(
		length > 1, "length must be larger than one.".red)

	// test that the bases are both round numbers

	console.assert(
		Math.round(fromBase) === fromBase, "fromBase must be a round number".red)

	console.assert(
		Math.round(toBase) === toBase, "toBase must be a round number".red)

	console.assert(
		Math.round(length) === length, "length must be a round number".red)

	return Math.ceil(length *  Math.log(fromBase) / Math.log(toBase))
}







const deriveKeys = function (args) {
	/*
	generate the output password.
	*/

	digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		lengthInBase(args.length, 62, 16)
	)

	converted =
		convertBase62(digested.toString())

	console.log(converted.length)

	console.assert(args.length === converted.length)

	return converted
}

module.exports = {
	deriveKeys:    deriveKeys,
	lengthInBase:  lengthInBase,
	convertBase62: convertBase62
}
