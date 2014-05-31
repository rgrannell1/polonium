#!/usr/bin/env node

const assert           = require('assert')
const prompt           = require('prompt') // save me implementing tput bindings.
const bignum           = require('bignum')

const lengthInBase     = require('../lib/derive-keys').lengthInBase
const deriveKeys       = require('../lib/derive-keys').deriveKeys
const convertToCharset = require('../lib/derive-keys').convertToCharset

const log = console.log





;( function () {

	log("test that converting from base10.".blue)

	const alphanumbers =
		'abcdefghijklmnopqrstuvwxyx' +
		'ABCDEFGHIJKLMNOPQRSTUVWXYX' +
		'0123456789'


	var groups = {equal: [], tosmall: [], tobig: []}

	for (var ith = 0; ith < 100; ith++) {
		var base10 = ith.toString()

		var base62 = convertToCharset(base10, alphanumbers)
		var expectLength = lengthInBase({
			length  : base10.length,
			fromBase: 10,
			toBase  : 62
		})

		if ((base62.length - expectLength) === 0 ) {
			groups.equal.push( base10 + " " + base62 + " " + expectLength )
		}

		if ((expectLength - base62.length) === -1 ) {
			groups.tosmall.push( base10 + " " + base62 + " " + expectLength )
		}
		if ((expectLength - base62.length) === +1 ) {
			groups.tobig.push( base10 + " " + base62 + " " + expectLength )
		}


		//console.assert(base62.length - expectLength > 1)
	}

	console.dir(groups)

} )()

