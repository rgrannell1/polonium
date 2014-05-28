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

	const ratio = Math.log(fromBase) / Math.log(toBase)

	return Math.ceil(length * ratio)
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
		.slice(0, args.length)

	console.assert(args.length === converted.length)

	return converted
}

module.exports = deriveKeys
