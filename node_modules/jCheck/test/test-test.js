
const is         = require('is')

const jCheck     = require('../jCheck')
const over       = jCheck.over
const over_      = jCheck.over_
const describe   = jCheck.describe
const holdsWhen  = jCheck.holdsWhen
const holdsWhen_ = jCheck.holdsWhen_
const run        = jCheck.run

over_('val')

.describe('this is a work')
.holdsWhen_(
	function (x) {return true},
	function (x) {return true},
	function (x) {return true},
	function (x) {return true}
)

.run()
