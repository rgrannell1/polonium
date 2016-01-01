
module.exports = {
	describe   : require('./lib/grammar').describe,

	over       : require('./lib/grammar').over,
	over_      : require('./lib/grammar').over_,

	holdsWhen  : require('./lib/grammar').holdsWhen,
	holdsWhen_ : require('./lib/grammar').holdsWhen_,

	failsWhen  : require('./lib/grammar').failsWhen,
	failsWhen_ : require('./lib/grammar').failsWhen_,

	worksWhen  : require('./lib/grammar').worksWhen,
	worksWhen_ : require('./lib/grammar').worksWhen_,

	run        : require('./lib/grammar').run
}
