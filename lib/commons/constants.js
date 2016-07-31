#!/usr/bin/env node

"use strict"




var constants = {
	charsets: {
		alphanumbers: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyx'
	},
	bases: {
		outputBase: 62
	},
	colourFlags: {
		highEntropy: 'green',
		lowEntropy:  'red'
	},
	lowEntropyLimit: 80,
	isWindows:       /^win/.test(process.platform)
}





module.exports = constants
