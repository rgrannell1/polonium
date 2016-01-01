
var a = function (str, val) {

	if (Object.prototype.toString.call(str) !== '[object String]') {
		throw TypeError('a: the argument matching "str" must be a string.')
	}

	return Object.prototype.toString.call(val).toLowerCase() ===
		"[object " + str.toLowerCase() + "]"
}





var what = function (val) {
	return Object.prototype.toString.call(val).toLowerCase().slice(8, -1)
}





var classes = ['array', 'boolean', 'date', 'error', 'function', 'location',
	'null', 'number', 'object', 'regexp', 'string', 'symbol', 'undefined']





var is = ( function () {

	return classes.reduce(function (self, key) {

		self[key] = a.bind(null, key)
		return self

	}, a)

} )()



var always = ( function () {

	var always = function (str, val, message) {

		if (!is[str](val)) {

			var messageClass = Object.prototype.toString.call(message)

			if (messageClass === '[object Function]') {
				// -- supply information to a function callback.

				throw TypeError( message(val, str, what(val)) )

			} else if (messageClass === '[object String]') {

				throw TypeError(message)

			} else {

				var message = 'always.' + str + ': value was not a ' + str + ' (actual type was ' + what(val) + ')'

				if (arguments.callee && arguments.callee.name) {
					message = arguments.callee.name += message
				}

				throw TypeError(message)

			}

		}
	}

	return classes.reduce(function (self, key) {

		self[key] = always.bind(null, key)
		return self

	}, always)

} )()





var never = ( function () {

	var never = function (str, val, message) {

		if (is[str](val)) {

			var messageClass = Object.prototype.toString.call(message)

			if (messageClass === '[object Function]') {
				// -- supply information to a function callback.

				throw TypeError( message(val, str, what(val)) )

			} else if (messageClass === '[object String]') {

				throw TypeError(message)

			} else {

				var message = 'never.' + str + ': value was a ' + str

				if (arguments.callee && arguments.callee.name) {
					message = arguments.callee.name += message
				}

				throw TypeError(message)

			}

		}
	}

	return classes.reduce(function (self, key) {

		self[key] = never.bind(null, key)
		return self

	}, never)

} )()





is.a      = a
is.what   = what
is.always = always
is.never  = never





if (typeof module !== "undefined") {
	module.exports = is
}
