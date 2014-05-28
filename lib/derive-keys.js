#!/usr/bin/env node

var crypto = require("crypto")
var bases  = require("bases")
var bignum = require("bignum")

const convertBase62 = function (num) {
	/*
	convert .
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






const deriveKeys = function (args) {
	/*
	generate the output password.
	*/

	digested  = crypto.pbkdf2Sync(args.master, args.modifier, args.rounds, 800)
	converted = convertBase62(digested.toString())

	console.assert(converted.length)

	return converted
}

module.exports = deriveKeys
