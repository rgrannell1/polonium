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






const hashPassword = function (args) {
	/*
	generate the output password.
	*/

	var digested = args.master

	for (var ith = 0; ith < args.rounds; ith++) {

		sha = crypto.createHash('sha512')
		sha.update(args.modifier + digested)
		digested = sha.digest('hex')
	}

	return convertBase62(digested.toString()).slice(0, args.length)
}

// hashPassword({
//    rounds:   1000000,
//    modifier: 'asd',
//    master:   'password',
// })




module.exports = hashPassword
