
const colourise  = require('./colourise')
const fromStream = require('./generator')
const flotsam    = require('./flotsam')
const format     = require('string-template')

const is         = require('is')

const restOf     = flotsam.restOf
const uniqueOf   = flotsam.uniqueOf
const indicesOf  = flotsam.indicesOf
const stopwatch  = flotsam.stopwatch
const rightPad   = flotsam.rightPad
const match      = flotsam.match
const addSuffix  = flotsam.addSuffix
const pluralise  = flotsam.pluralise
const tabulate   = flotsam.tabulate
const repeat     = flotsam.repeat
const flatMap    = flotsam.flatMap
const atKey      = flotsam.atKey
const delimit    = flotsam.delimit
const addCommas  = flotsam.addCommas
const zip        = flotsam.zip
const unspread   = flotsam.unspread

const inspect    = require('util').inspect






/*
	nonLogicalError :: string x (any -> logical) x [any] -> string

	Return an message explaining that a function returned a non-logical
	value for a particular test case, and include information about the function.

*/

const nonLogicalError = function (info, prop, tcase) {

	return format(
		'"{info} {failed}.\n' +
		'The property \n\n' +
		'{prop}\n\n' +
		'returned a non-logical result for the test-case\n\n' +
		'{tcase}\n', {
			info  : info,
			prop  : prop.toString(),
			tcase : JSON.stringify(tcase)
	})
}

/*
	CheckPredicate ::   (any -> logical) x [any] -> logical
	CheckPredicate :: [(any -> logical)] x [any] -> logical

	Checks if a test case is a valid test case for a property group.
	If given a function, it applies each testcase argument binding to the function.
	If given an array of functions, it matches a function to each testcase argument binding.
*/

const checkPredicate = function (precond, tcase) {

	if (is.function(precond)) {

		return precond.apply(null, tcase)

	} else if (is.array(precond)) {

		return zip(precond, tcase).reduce(function (sofar, pair) {

			const paramPred = pair[0]
			const paramArg  = pair[1]

			return sofar && paramPred(paramArg)

		}, true)

	} else {
		throw "predicate was not an array or function."
	}
}

/*
	RunTest :: () x [] x [] x [any] x [string]
*/

const runTest = function (tester, groups, state, tcase, infos) {

	for (var groupIth = 0; groupIth < groups.length; groupIth++) {

		var group = groups[groupIth]

		var groupPred  = group[0]
		var groupProps = restOf(group)

		var isMatch = checkPredicate(groupPred, tcase)

		state.casesExamined[groupIth] += 1

		if (!isMatch) {
			continue
		}

		state.testsRun[groupIth] += 1

		/*
			the predicate for this group was true; test each associated
			property.
		*/

		for (var propIth = 0; propIth < groupProps.length; propIth++) {

			var prop    = groupProps[propIth]
			var hasProp = tester(prop, tcase)

			// the result of the predicate was non-boolean.
			if (hasProp !== true && hasProp !== false) {
				throw nonLogicalError(
					infos[groupIth][propIth], prop, JSON.stringify(tcase))
			}

			if (!hasProp) {

				// note the earliest fail.
				state.failsAfter =
					state.testsRun
					.reduce(Math.min, state.failsAfter)

				// store the index of the failed properties.

				var failedIndex = {
					group    : groupIth,
					property : propIth,
					summary  : groupIth + ', ' + propIth
				}

				state.failedIndices =
					state.failedIndices.concat(failedIndex)

				// store the failed cases.
				state.failsFor =
					state.failsFor.concat( [{
						case : tcase,
						index: failedIndex.summary
					}] )

			}
		}

	}

	return state
}











/*
	yieldCase :: [string] x number -> [any]

	Generate bindings for each random variable.

*/

const yieldCase = function (strs, num) {

	return strs.map(function (param) {
		return fromStream(num)
	})

}











/*
	propertyError

	A property was untrue, and the test failed.
*/

const propertyError = function (props, testData, state) {

	const after    = state.failsAfter
	const indices  = state.failedIndices

	// whichFailed, descriptions, expressions are co-ordered.

	const whichFailed = uniqueOf(indices)
	const expressions = whichFailed.map( function (triple) {

		const ith = triple.group
		const jth = triple.property + 1

		return props[ith][jth].toString()
	})

	const descriptions = whichFailed.map( function (triple) {
		return testData.info[triple.group]
	})
	const frequencies  = tabulate( indices.map(atKey('summary')) )

	const failsFor     = whichFailed.map(function (triple) {

		const failed = state.failsFor.filter(function (pair) {
			return pair.index === triple.summary
		})[0].case

		return inspect(failed, {
			color: true
		})

	})

	const paragraphs =
		indicesOf(whichFailed)
		.map(function (ith) {

			return format(
				'"{info}" {failed}!\n\n' +
				'{prop}' +
				'\n\nfailed {freq} {times}. Counterexample:\n\n' +
				'{tcase}\n', {

				info  : descriptions[ith],
				failed: colourise.red('failed'),
				prop  : expressions [ith],
				freq  : addCommas(frequencies[ith].freq),
				times : pluralise('time', frequencies [ith].freq),
				tcase : failsFor[ith]
			})

		})
		.reduce(function (acc, current) {
			return acc + '\n\n' + current
		})

	const header = format('{failed} after {after} {cases}.\n\n', {
		failed : colourise.red('Failed!'),
		after  : addCommas(after + 1),
		cases  : pluralise('test case', after + 1)
	})

	throw header + paragraphs + '\n\n'
}











/*
	exhaustionWarning ::

	warn that no test-cases were given to some property group.
*/

const exhaustionWarning = function (testData, state, info) {

	const message = format('"{info}" {failed}\n all {examined} test-cases were rejected for {time} seconds' , {
		info     : testData.info,
		failed   : colourise.yellow(" Failed!"),
		examined : state.casesExamined,
		time     : testData.time
	})

	console.log(message)
}






/*
	successMessage ::

	Report that all tests succeeded.
*/

const successMessage = function (states, infos) {
	/*
		for each state object get the number of
		tests of that type run, convert to .csv
	*/

	// info is flat, so it must be iterated over seperately.

	var testsRun = flatMap(function (state) {
		return [{
			examined : state.casesExamined,
			run : state.testsRun
		}]
	}, states)

	const message =
		// map over the indices 1, 2, 3.
		Object.keys(states)
		// select the indices with properties.
		.filter(function (stateIth) {
			return states[stateIth].testsRun.length > 0
		})
		// generate a description of the properties of each group.
		.map(function (stateIth) {

			var stateIth = parseInt(stateIth)
			const state  = states[stateIth]

			// describe each individual property.
			return Object.keys(state.testsRun)
			.map(function (propJth) {

				var propJth = parseInt(propJth)

				const examined = testsRun[stateIth].examined[propJth]
				const run      = testsRun[stateIth].run     [propJth]
				const info     = infos   [stateIth]         [propJth]

				// give the property description.
				const descr = rightPad(
					format('"{info}" {passed}!', {
						info   : info,
						passed : colourise.green('passed')
					}), 90)

				// for this property, how many tests were run or examined?

				const stats = format("({run}/ {examined})", {
					run      : colourise.green( rightPad(addCommas(run), 11) ),
					examined : colourise.black( rightPad(addCommas(examined), 11) )
				})

				return descr + stats

			}).
			reduce(delimit('\n'))

		}).
		reduce(delimit('\n'))

	console.log(message)

	return message
}







/*
	holdsWhenTest :: (any -> logical) -> [any]

	A predicate that tests that a predicate is true
	for a test case.
*/

const holdsWhenTest = function (prop, tcase) {
	return prop.apply(null, tcase)
}

/*
	worksWhenTest :: (any -> logical) -> [any]

	Predicate that returns true when an
	expression doesn't fail.
*/

const worksWhenTest  = function (prop, tcase) {

	try {
		prop.apply(null, tcase)
		return true
	} catch (err) {
		return false
	}

}

/*
	failsWhenTest :: (any -> logical) -> [any]

	Predicate that returns true if a function fails
	for it's input test case.
*/

const failsWhenTest = function (prop, tcase) {

	try {
		prop.apply(null, tcase)
		return false
	} catch (err) {
		return true
	}
}






/*
	State :: number -> object

	State keeps track of one holdsWhen, failsWhen, or worksWhen block.
	It checks what properties failed, for what cases, when this happened,
	and how many tests were run.

*/

const State = function (noProperties) {

	return {
		casesExamined : repeat(noProperties, 0),
		testsRun      : repeat(noProperties, 0),
		failsFor      : [],
		failsAfter    : Infinity,
		failedIndices : []
	}
}






/*
	executeTest ::

	The backend wrapper in which the test is executed.
*/

const executeTest = function (test) {

	const params = test.params
	const time   = test.time

	// holdsWhen, failsWhen & worksWhen get accompanying state objects.

	const propTypes = [
		test.holdsWhenProperty || [],
		test.failsWhenProperty || [],
		test.worksWhenProperty || []
	]

	var states       = [
		State(propTypes[0].length),
		State(propTypes[1].length),
		State(propTypes[2].length)
	]

	var _used = 0
	var infos = []

	for (var ith = 0; ith < propTypes.length; ith++) {

		var groupLen = propTypes[ith].length

		infos.push(test.info.slice(
			_used, _used + groupLen ))
		_used += groupLen

	}

	const testers  = [holdsWhenTest, failsWhenTest, worksWhenTest]
	const timeLeft = stopwatch(time)

	/*
		execute the tests and collect statistics on the failures.
	*/

	var len = 0

	getCaseLength = function (length) {
		return Math.random() > 0.95 * Math.pow(0.95, length)? length + 1: length
	}

	while (timeLeft()) {

		/*
			incrementing gets faster over time,
			as small n tend to expose more base cases.
		*/
		Math.random() > 0.95 * Math.pow(0.95, len)? len++: len

		var tcase = yieldCase(params, Math.ceil(len / 20))

		zip(testers, propTypes, states)
		.forEach(unspread(
			function (tester, propGroup, state) {
				runTest(tester, propGroup, state, tcase, infos)
			}
		))

	}

	// additional data needed to report success or failure.

	const testData = {
		info: infos,
		time: time
	}

	/*
		Check that the correct number of tests were run, and
		that none of the tests fail.
	*/

	zip(states, propTypes, testers)
	.forEach(unspread(
		function (state, propGroup, tester) {

			if (propGroup.length > 0 && state.testsRun === 0) {
				exhaustionWarning(testData, state)
			}

			if (state.failsFor.length > 0) {
				propertyError(propGroup, testData, state)
			}

	}) )

	successMessage(states, infos)
}











module.exports = executeTest
