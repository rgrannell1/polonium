#!/usr/bin/env node

"use strict"




var constants = {
	charsets: {
		alphanumbers: '0123456789abcdefghijklmnopqrstuvwxyxABCDEFGHIJKLMNOPQRSTUVWXYX'
	},
	bases: {
		outputBase: 62
	},
	colourFlags: {
		highEntropy: 'green',
		lowEntropy:  'red'
	},
	lowEntropyLimit: 80
}





module.exports = constants
