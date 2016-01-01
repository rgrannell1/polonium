
const flotsam   = require('../lib/flotsam')
const assert    = require('assert')

const restOf    = flotsam.restOf
const uniqueOf  = flotsam.uniqueOf
const indicesOf = flotsam.indicesOf
const tabulate  = flotsam.tabulate
const repeat    = flotsam.repeat
const pluralise = flotsam.pluralise
const addSuffix = flotsam.addSuffix
const match     = flotsam.match








console.log('restOf')

	assert(restOf([]).length  === 0)
	assert(restOf([1]).length === 0)
	assert(restOf([1, 2]).length === 1)

console.log('uniqueOf')

	assert(uniqueOf([]).length === 0)
	assert(uniqueOf([1])[0]    === 1 && uniqueOf([1]).length    === 1)
	assert(uniqueOf([1, 1])[0] === 1 && uniqueOf([1, 1]).length === 1)
	assert(uniqueOf([1, 2])[0] === 1 && uniqueOf([1, 2])[1]     === 2 && uniqueOf([1, 2]).length === 2)

console.log('indicesOf')

	assert(indicesOf([0, 1, 2]).length === 3)
	assert(indicesOf([0, 1, 2])[0]    === 0)
	assert(indicesOf([0, 1, 2])[1]    === 1)
	assert(indicesOf([0, 1, 2])[2]    === 2)

console.log('rightPad')


console.log('match')

	const _ = undefined

	assert(
		match([1, 2, 3], [
			[[1, 2, _], true]
		])
	)

	assert(
		match([1, 2, 3], [
			[[_, _, _], true]
		])
	)

	assert(
		match([1, 2, 3], [
			[[1, _, 4], false],
			[[_, _, _], true]
		])
	)

console.log('addSuffix')

	assert(addSuffix(1) === '1st')
	assert(addSuffix(2) === '2nd')
	assert(addSuffix(3) === '3rd')
	assert(addSuffix(11) === '11th')
	assert(addSuffix(12) === '12th')
	assert(addSuffix(13) === '13th')

console.log('pluralise')

	assert(pluralise('monkey', 1) === 'monkey')
	assert(pluralise('monkey', 2) === 'monkeys')

console.log('tabulate')

	assert(
		tabulate(['a', 'a'])[0].val === 'a' &&
		tabulate(['a', 'a'])[0].freq === 2 )

	assert(
		tabulate(['a', 'b'])[1].val === 'b' &&
		tabulate(['a', 'b'])[1].freq === 1 )

console.log('repeat')

	assert(repeat(0, 'a').length === 0)
	assert(repeat(1, 'a').length === 1)
	assert(repeat(2, 'a').length === 2)
	assert(repeat(2, 'a')[0]     === 'a')
