
const jcheck     = require('../jCheck')

const over       = jcheck.over
const over_      = jcheck.over_

const describe   = jcheck.describe

const holdsWhen  = jcheck.holdsWhen
const holdsWhen_ = jcheck.holdsWhen_

const run        = jcheck.run




over_('val')

.describe('true is always true')
.holdsWhen_(
	function (val) {return true},
	function (val) {return true}
)

.run()






over_('val0', 'val1')

.describe('true is always true')
.holdsWhen_(
	function (val0, val1) {return true},
	function (val0, val1) {return true}
)

.run()






over_('a', 'b')

.describe('string concatentation adds its input lengths')
.holdsWhen_(
	function (a, b) {
		return typeof a === 'string' && typeof b === 'string'
	},
	function (a, b) {
		return (a + b).length === (b + a).length
	},
	function (a, b) {
		return (a + b).length === a.length + b.length
	}
)

.describe('string concatentation with empty-string is same length')
.holdsWhen_(
	function (a, b) {
		return typeof a === 'string' && typeof b === 'string' && (a.length * b.length) === 0
	},
	function (a, b) {
		return a.length === 0?
			(a + b).length === b.length:
			(a + b).length === a.length
	}

)

.run()







over_('val')

.describe('throw always fails')
.failsWhen_(
	function (val) {return true},
	function (val) {throw 'error! folly! poppycock! tisch! fipsy!'}
)

.run()
