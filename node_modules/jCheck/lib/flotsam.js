
/*
	----------------------------------- Helpers -----------------------------------

*/

/*
	restOf :: [a] -> [a]

	Remove the first element from an array.

*/

const restOf = function (coll) {

	var out = []

	for (var ith = 0; ith < coll.length; ith++) {
		if (ith !== 0) {
			out = out.concat( coll[ith] )
		}
	}

	return out
}











/*
	uniqueOf :: [a] -> [a]

	Get the unique values in a collection.
*/

const uniqueOf = function (coll) {

	var set = []

	for (var ith = 0; ith < coll.length; ith++) {

		var elem     = coll[ith]
		// as good a hack as any.
		var elemText = JSON.stringify(elem)
		var hasMatch = false

		for (var jth = 0; jth < set.length; jth++) {

			var setElemText = JSON.stringify(set[jth])

			if (elemText === setElemText) {
				hasMatch = true
			}
		}

		if (!hasMatch) {
			set.push(elem)
		}
	}

	return set
}










/*
	indicesOf :: [a] -> [number]


	Get the indices of a collection.
*/

const indicesOf = function (coll) {

	var indices = []

	for (var ith = 0; ith < coll.length; ith++) {
		indices[ith] = ith
	}

	return indices

}











/*
	stopwatch :: number -> ( -> boolean)

	takes a number of seconds, and
	returns a function that returns true if
	called within that timespan after creation.

*/

const stopwatch = function (num) {

	const posixTime = function () {

		return Math.round((new Date).getTime() / 1000.0)
	}

	const genesis = posixTime()

	return function () {

		const lifespan  = posixTime() - genesis
		return lifespan < num

	}
}










/*
	rightPad :: string x number -> string

	make a string fixed length by addings empty space to its right.
*/

const rightPad = function (str, num) {
	return str.length < num? str + Array(num - str.length).join(' '): str
}








/*
	flatMap :: (a -> [b]) x [a] -> [b]

	flatMap applies a function to each element of
	a collection, and concatenates the result.
*/

const flatMap = function (fn, coll) {

	var out = []

	for (var ith = 0; ith < coll.length; ith++) {
		out = out.concat( fn(coll[ith]) )
	}

	return out
}













/*
	match ::

	Match an array of elements versus several possible patterns,
	and return the value assoicated with the pattern.
*/

const match = function (tcase, patterns) {

	for (var ith = 0; ith < patterns.length; ith++) {

		var allMatch = true
		var pattern  = patterns[ith][0]

		if (pattern.length !== tcase.length) {
			throw RangeError('pattern too short.')
		}

		var response = patterns[ith][1]

		for (var jth = 0; jth < tcase.length; jth++) {

			allMatch = allMatch && (pattern[jth] === undefined || tcase[jth] === pattern[jth])

		}

		if (allMatch) {
			return response
		}
	}

	throw "internal error: non-exhaustive pattern matching!"
}










/*
	addSuffix :: number -> string

	Make a number an adjective by adding a suffix (1st, 2nd, 3rd).

*/

const addSuffix = function (num) {

	if (!isFinite(num)) {
		return 'Infinith'
	}

	const lastDigit =
		parseInt(num
			.toString()
			.match(/[0-9]$/g)[0],
		10)

	const _      = undefined
	const suffix = match([num, lastDigit], [
		[[1,  _], "st"],
		[[2,  _], "nd"],
		[[3,  _], "rd"],
		[[11, _], "th"],
		[[12, _], "th"],
		[[13, _], "th"],
		[[_ , 1], "st"],
		[[_ , 2], "nd"],
		[[_ , 3], "rd"],
		[[_ , _], "th"]
	])

	return num + suffix
}











/*
	pluralise :: string -> number -> string

	pluralise a string based on a number.

*/

const pluralise = function (str, num) {
	return num > 1 || num === 0? str + 's': str
}








/*
	tabulate :: [a] -> [[a, number]]

	compute a frequency table from a collection of values.
*/

const tabulate = function (coll) {

	if (coll.length === 0) {
		return []
	} else {

		const set = uniqueOf(coll)
		// get the underlying set of coll.
		var   out = set.map(function (elem) {
			return {
				val  : elem,
				freq : 0
			}
		})

		for (var ith = 0; ith < coll.length; ith++) {
			// for each element in coll
			var elem = coll[ith]

			for (var jth = 0; jth < out.length; jth++) {

				var setElem = out[jth]

				// if this elem is equal to the jth setElem, increment the freq.

				if (uniqueOf([elem, setElem.val]).length === 1) {
					out[jth].freq += 1
					break
				}

			}
		}

		return out
	}
}








/*
	repeat :: number x a -> [a]

	repeat a value several times.
*/

const repeat = function (num, val) {
	var out = []
	for (var ith = 0; ith < num; ith++) {
		out[ith] = val
	}
	return out
}








/*
	atKey :: string -> Object -> a

	get an object at a key.
*/

const atKey = function (str) {
	return function (obj) {
		return obj[str]
	}
}








/*
	oneOf :: [a] -> a

	select a random element from a collection.
*/

const oneOf = function (coll) {
	return coll[Math.floor(Math.random() * coll.length)]
}









/*
	delimit :: string -> string x string -> string

	create a function that delimits a pair of strings
	with a delimiter.
*/

const delimit = function (delimiter) {
	return function (str0, str1) {
		return str0 + delimiter + str1
	}
}








/*
	addCommas :: number -> string

	comma delimit a number at every third place.
*/

const addCommas = function (num) {

	var out = ''
	var num = num.toString(10).split('')

	var ith = num.length-1

	while (ith >= 0) {

		var digitIndex = num.length - ith - 1

		ith % 3 === 2 && ith !== num.length - 1?
			out += ',' + num[digitIndex]:
			out += num[digitIndex]

		ith--
	}

	return out
}








/*
	K :: a -> -> a

	Capture a value.
*/

const K = function (val) {
	return function () {return val}
}









const zip = function () {

	const args = Array.prototype.slice.call(arguments)

	return args[0].map(function (_, ith) {
		return args.map( function (array) {return array[ith]} )
	})

}



const unspread = function (fn) {
	return function (array) {
		return fn.apply(null, array)
	}
}



module.exports = {
	restOf    : restOf,
	uniqueOf  : uniqueOf,
	indicesOf : indicesOf,
	stopwatch : stopwatch,
	rightPad  : rightPad,
	match     : match,
	addSuffix : addSuffix,
	pluralise : pluralise,
	tabulate  : tabulate,
	repeat    : repeat,
	atKey     : atKey,
	flatMap   : flatMap,
	oneOf     : oneOf,
	delimit   : delimit,
	addCommas : addCommas,
	K         : K,
	zip       : zip,
	unspread  : unspread
}
