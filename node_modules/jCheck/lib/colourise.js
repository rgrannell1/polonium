
const match = require('./flotsam').match

/*
	Add tput colours to a string.
*/

const colourise = ( function () {

	const supportColour = function () {

		const TERM      = process.env.TERM
		const COLORTERM = process.env.COLORTERM

		const _ = undefined

		return match(
			[TERM, COLORTERM], [
			[["screen",          _], true ],
			[["screen-256color", _], true ],
			[["xterm-color",     _], true ],
			[["xterm-256color",  _], true ],
			[[_,  'gnome-terminal'], true ],
			[[_,                 _], false]
		])
	}

	const colouriser = function (code) {
		return function (message) {
			return supportColour()? "\033[" + code + message + "\033[0m": message
		}
	}

	return {
		black  : colouriser("0;30m"),
		blue   : colouriser("0;34m"),
		green  : colouriser("0;32m"),
		red    : colouriser("0;31m"),
		yellow : colouriser("1;33m")
	}

} )()

module.exports = colourise
