
const report = {}

/**
 * Report an error
 *
 * @param {Error} err an application error
 */
report.error = err => {
  console.error(err.message)
}

/**
 * Select indices from a password.
 *
 * @param {string} string the password to substring
 * @param {Array<number>} indices index data
 *
 * @returns {Array<Object>} an array of character data.
 */
report.selectPassword = (string, indices) => {
  return string.split('')
    .map((char, ith) => {
      return { char, index: ith + 1, ith }
    })
    .filter(data => {
      return indices
        ? indices.includes(data.index)
        : true
    })
}

/**
 * Report the generated password.
 *
 * @param {string} password the password to report.
 * @param {Object} args CLI arguments.
 *
 */
report.password = (password, args) => {
  const selection = report.selectPassword(password, args.indices)

  if (args.group) {
    let index = 1
    let buffer = []
    for (const data of selection) {
      buffer.push(data.char)

      if (buffer.length >= args.group) {
        const indexStr = (index + '').padEnd(2)
        console.error(`${indexStr} ${buffer.join('')}`)
  
        buffer = [ ]
        index++
      }
    }

    if (buffer.length > 0) {
      const indexStr = (index + '').padEnd(2)
      console.error(`${indexStr} ${buffer.join('')}`)
    }
  } else if (args.line) {
    for (const data of selection) {
      const index = (data.index + '').padEnd(2)
      console.error(`${index} ${data.char}`)
    }
  } else {
    const merged = selection.map(data => data.char).join('')
    console.error(merged)
  }
}

module.exports = report
