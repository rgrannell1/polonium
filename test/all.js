#!/usr/bin/env node

const deriveKeys       = require('../lib/app/derive-keys')
const shannonEntropyOf = require('../lib/commons/shannon-entropy-of')
const getPassword      = require('../lib/app/get-password')


const jCheck           = require('jCheck')
const is               = require('is')

const over             = jCheck.over
const over_            = jCheck.over_
const describe         = jCheck.describe
const holdsWhen        = jCheck.holdsWhen
const holdsWhen_       = jCheck.holdsWhen_
const run              = jCheck.run





over_('master', 'salt')

.describe('the correct length password is always returned.')
.holdsWhen_(
	function (master, salt) {
		return is.string(master) && is.string(salt) &&
			master.length * salt.length > 0
	},
	function (master, salt) {

		/*
			TODO REMOVE THIS CRAP

			jCheck currently needs every predicate to match to produce
			a test case, and expecting four predicates to be true of random variables
			at once doesn't work. For now, generate the easier random variables - the numbers -
			inside the test.
		*/

		const rounds = Math.floor(Math.random( ) * 1000)
		const len    = Math.floor(Math.random( ) * 1000)

		const key = deriveKeys({
			master: master,
			salt  : salt,
			rounds: rounds,
			len   : len
		})

		return key.length === len
	}
)

.run(10)





over_('len', 'base')

.describe('entropyOf always returns a non-nan, positive number.')
.holdsWhen_(
	function (len, base) {
		return is.number(len) && is.number(base) &&
			len > 0 && base > 0 &&
			len === len && base === base
	},
	function (len, base) {
		const entropy = shannonEntropyOf(len, base)
		return is.number(entropy)  && entropy === entropy
	}
)

.run( )
