
/*
	----------------------------------- jCheck -----------------------------------

	jCheck is a quick and dumn property testing framework for JavaScript / Node.





*/

const runif = function (num) {
	return Math.floor(Math.random() * num)
}

const one_of   = function (coll) {
	return coll[Math.floor(Math.random() * coll.length)]
}

const pick_one = function (coll) {
	return function (len) {
		return one_of(coll)
	}
}
const pick_one_gen = function (fns) {
	return function (len) {
		return one_of(fns)(len)
	}
}

const vectorise = function (fn) {
	return function (len) {
		var out = []
		for (var ith = 0; ith < len; ith++) {
			out[ith] = fn(runif(100))
		}
		return out
	}
}





const fromStream = ( function () {

	var self = {}

	/*
		----------------------------------- Generators -----------------------------------

	*/

	// ----------------------------------- numeric -----------------------------------

	self.number = function (len) {
		// uniform random number of a given order 'len'.

		const  sign = Math.random() > 0.5? +1: -1
		return sign * Math.random() * Math.pow(10, len)
	}
	self.integer = function (len) {
		// uniform random integer of a given order 'len'.

		return Math.round(self.number(len))
	}

	self.nan    = function (len) {
		return NaN
	}

	self.numberArray  = vectorise(self.number)
	self.integerArray = vectorise(self.integer)
	self.nanArray     = vectorise(self.nan)

	// ----------------------------------- character -----------------------------------

	self.alphabetical = (function () {
		// uppercase and lowecase letters in a string of length 'len'.

		const charset =
			'abcdefghijklmnopqrstuvwxyz' +
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

		return function (len) {

			var out = ''

			for (var ith = 0; ith < len; ith++) {
				out += charset.charAt(Math.random() * charset.length)
			}

			return out
		}

	})()

	self.alphabeticalArray  = vectorise(self.alphabetical)

	/*
		----------------------------------- Sampler -----------------------------------

	*/

	return function (len) {
		// return a random generator.

		const generators = Object.keys(self)
		const ith        = generators[Math.floor(Math.random() * generators.length)]

		return self[ith](len)
	}

} )()





module.exports = fromStream
