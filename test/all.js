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

	for (var masterNum = 0; masterNum < 1000; masterNum++) {

		var master = masterNum.toString()

		for (var rounds = 0; rounds < 100; rounds++) {

			for (var saltNum = 0; saltNum < 100; saltNum++) {

				var salt = saltNum.toString()

				for (var len = 0; len < 100; len++) {

					var out = deriveKeys({
						master: master,
						rounds : rounds,
						salt  : salt,
						len   : len
					})

				}
			}
		}
	}



} )()

