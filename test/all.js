#!/usr/bin/env node

const assert        = require('assert')
const prompt        = require('prompt') // save me implementing tput bindings.

const lengthInBase  = require('../lib/derive-keys').lengthInBase
const deriveKeys    = require('../lib/derive-keys').deriveKeys
const convertBase62 = require('../lib/derive-keys').convertBase62

const log = console.log





;( function () {

	log("test that lengthInBase( ) is accurate".blue)

	// converting from on base to the same base preserves the length.

	for (var len = 1; len < 10000; len++) {
		for (var base = 1; base < 1000; base++) {

			var outLength = lengthInBase(len, base, base)

			assert(
				outLength === len,
				('failed for (' + len + ',' + base + ',' + base + ') with the length ' + outLength + ')').red)

		}
	}


} )()

