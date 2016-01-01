
/*
	-------------------------------- Grammar --------------------------------

	describe(string)                 add a description to a property group. Concatanative property.

	over([string])                   the parametres to bind random variables to.
	                                 Overriding property.

	over_(string_)                   the parametres to bind random variables to.
	                                 Overriding property.

	holdsWhen(Function, [Function])  holdsWhen a predicate is true, assert that several other
	                                     predicates are also true. Concatanative property.

	holdsWhen_(Function_)            holdsWhen_ a predicate is true, assert that several other
	                                     predicates are also true. Concatanative property.

	run(number)                          triggers the start of a test, specifies how long the test runs for.

*/

const executeTest = require('./run-test')
const fromStream  = require('./generator')
const colourise   = require('./colourise')

const restOf      = require('./flotsam').restOf










const describe = function (info) {

	const self  = joinTest(this, {
		info : info,
		type : 'describe'
	})

	return self
}











/*
Bind random variables to test over.

@param {[string]} strs. An array of strings.
*/

const over = function (strs) {

	const self  = joinTest(this, {
		params 	: strs,
		type   	: 'over'
	})

	return self
}

/*
	Variadic form of over.
*/

const over_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		params 	: args,
		type   	: 'over'
	})

	return self
}










/*
When a predicate is true of a test-case, ensure several other predicates are true too.

@param {Function}   pred:  a predicate function. This function tests if a test-case
    is suitable to be given to a set of properties.

@param {[Function]} preds: an array of predicate functions. These functions are
    properties that must hold true for an test-case that matches `pred`.

@return {object}
*/

const holdsWhen = function (pred, preds) {

	const self  = joinTest(this, {
		holdsWhenProperty : [pred].concat(preds),
		type              : 'holdsWhen'
	})

	return self
}

/*
	Variadic form of holdsWhen.
*/

const holdsWhen_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		holdsWhenProperty : args,
		type         : 'holdsWhen'
	})

	return self
}











const failsWhen = function (pred, preds) {

	const self  = joinTest(this, {
		failsWhenProperty : [pred].concat(preds),
		type              : 'failsWhen'
	})

	return self
}

const failsWhen_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		failsWhenProperty : args,
		type              : 'failsWhen'
	})

	return self
}











const worksWhen = function (pred, preds) {

	const self  = joinTest(this, {
		worksWhenProperty : [pred].concat(preds),
		type              : 'worksWhen'
	})

	return self
}

const worksWhen_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		worksWhenProperty : args,
		type              : 'worksWhen'
	})

	return self
}










const holdsFor = function (preds) {

	const self  = joinTest(this, {
		worksWhenProperty : [function () {return true}].concat(preds),
		type              : 'worksWhen'
	})

	return self

}

const holdsFor_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		worksWhenProperty : [function () {return true}].concat(args),
		type              : 'worksWhen'
	})

	return self
}








const failsFor = function (preds) {

	const self  = joinTest(this, {
		failsWhenProperty : [function () {return true}].concat(preds),
		type              : 'failsWhen'
	})

	return self
}

const failsFor_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		failsWhenProperty : [function () {return true}].concat(args),
		type              : 'failsWhen'
	})

	return self
}










const worksFor = function (preds) {

	const self  = joinTest(this, {
		worksWhenProperty : [function () {return true}].concat(preds),
		type              : 'worksWhen'
	})

	return self
}

const worksFor_ = function () {

	const args = Array.prototype.slice.call(arguments)

	const self  = joinTest(this, {
		worksWhenProperty : [function () {return true}].concat(args),
		type              : 'failsWhen'
	})

	return self
}











/*
Run a test.

@param {number} num. The number of seconds testing should continue for.
*/

const run = function (num) {

	if (!num) {
		var num = 1
	}

	const self  = joinTest(this, {
		time : num,
		type : 'run'
	})

	return self
}










const _forallProto = {
	run         : run,

	over        : over,
	over_       : over_,

	holdsWhen   : holdsWhen,
	holdsWhen_  : holdsWhen_,

	failsWhen   : failsWhen,
	failsWhen_  : failsWhen_,

	worksWhen   : worksWhen,
	worksWhen_  : worksWhen_,

	holdsFor    : holdsFor,
	holdsFor_   : holdsFor_,

	failsFor    : failsFor,
	failsFor_   : failsFor_,

	worksFor    : worksFor,
	worksFor_   : worksFor_,

	describe    : describe
}





/*
	ensure that the test being passed to run
	can be executed properly.
*/
const validateTest = function (test) {

	// throw an error if any fields are missing.
	;['info', 'params', 'time'].forEach(function (key) {

		if (!test.hasOwnProperty(key)) {
			var message =
				"the property '" + key + "' was missing from the test object."

			throw colourise.red(message)
		}
	})

	// check each property.
	;['holdsWhenProperty', 'worksWhenProperty', 'failsWhenProperty']
	.filter(function (key) {
		const props = test[key]
		return props !== undefined
	})
	.forEach(function (key) {

		const props = test[key]

		if (toString.call(props) !== '[object Array]') {
			var message =
				'the property group "' + key + '" must be an array.'

			throw message
		}

		props.forEach(function (propGroup) {

			const pred = propGroup[0]

			if (
				toString.call(pred) !== '[object Function]' &&
				toString.call(pred) !== '[object Array]') {

				var message =
					'the predicate of the property-group "' + key +
					"' must be a single function, or an array of functions."

				throw message
			}

			restOf(propGroup).forEach(function (prop) {

				if (toString.call(prop) !== '[object Function]') {

					var message =
						'the property of the property-group "' + key +
						"' must be a function."

					throw message
				}
			})

		})

	})

	test.info.map(function (str) {

		if (toString.call(str) !== '[object String]') {
			var message =
				'the parametres of describe( ) must be a string.'

			throw message
		}

	})

	// time definitely must be a number.
	if (toString.call(test.time)!== '[object Number]') {

		var message =
			'the time-parametre passed to run( ) must be a number.'

		throw colourise.red(message)
	}

	// time mustn't be NaN
	if (test.time !== test.time) {

		var message =
			'the time-parametre passed to run( ) must not be NaN.'

		throw colourise.red(message)
	}

	// time definitely mustn't be Infinite
	if (!isFinite(test.time)) {

		var message =
			'the time-parametre passed to run( ) must not be Infinite.'

		throw colourise.red(message)
	}

	// time must be positive
	if (test.time < 0) {

		var message =
			'the time-parametre passed to run( ) must not be a positive number.'

		throw colourise.red(message)
	}

	return test
}





/*
	JoinTest

	JoinTest takes the 'this' passed to a grammar method, and some
	new data as its right argument. It then updates i
*/

const joinTest = ( function () {

	/*
		Test if an object is the global 'this' object.
	*/

	const isGlobalThis = function (obj) {
		return obj.GLOBAL || obj.window
	}

	return function (acc, right) {

		if (isGlobalThis(acc)) {
			var acc = Object.create(_forallProto)
		}

		const override = function (key) {
			return function () {

				acc[key] = right[key]
				return acc

			}
		}

		const join = function (key) {
			return function () {

				if (acc[key]) {
					acc[key] = acc[key].concat( [right[key]] )
				} else {
					acc[key] = [right[key]]
				}

				return acc
			}
		}

		const responses = {
			describe  : join('info'),
			over      : override('params'),
			holdsWhen : join('holdsWhenProperty'),
			failsWhen : join('failsWhenProperty'),
			worksWhen : join('worksWhenProperty'),
			run       : function () {

				acc.time = right.time

				executeTest(validateTest(acc))
			}
		}

		for (type in responses) {

			if (right.type === type) {
				return responses[type]()
			}
		}

	}

} )()











module.exports = {
	describe   : describe,

	over       : over,
	over_      : over_,

	holdsWhen  : holdsWhen,
	holdsWhen_ : holdsWhen_,

	run        : run
}
