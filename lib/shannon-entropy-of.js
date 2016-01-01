#!/usr/bin/env node

"use strict"





const log2 = function (num) {
	return Math.log(num) / Math.log(2)
}

const shannonEntropyOf = function (len, base) {
	return Math.floor(len * log2(base))
}





module.exports = shannonEntropyOf
