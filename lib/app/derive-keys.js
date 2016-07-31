#!/usr/bin/env node

"use strict"





const constants      = require('../commons/constants')
const convertCharset = require('./convert-charset')
const crypto         = require("crypto")





const deriveKeys = args => {
	/*
	generate output key.

	note on the '6 x len' step:

	six x len is never an underestimation of the number of bits needed, but is sometimes
	an overestimation. Converting between hex and base62 can produce strings of varying length,
	so unneeded bits are just truncated.

	log(62) / log(2) ~ 6 bits per base62-digit.
	*/

	// -- the length 'bits' gives the nubmer of bits.
	const digested  = crypto.pbkdf2Sync(
		args.master,
		args.salt,
		args.rounds,
		6 * args.len,
		args.digest
	)

	var converted =
		convertCharset(constants.charsets.alphanumbers, digested.toString('hex'))
		.slice(0, args.len)

	return converted
}




module.exports = deriveKeys
