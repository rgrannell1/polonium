
'use strict'

const error = err => {
  console.error(err.message)
}

const selectPassword = (string, indices) => {
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

const password = (password, args) => {
  const selection = selectPassword(password, args.indices)

  if (args.line) {
    for (const data of selection) {
      const index = (data.index + '').padEnd(2)
      console.error(`${index} ${data.char}`)
    }
  } else {
    const merged = selection.map(data => data.char).join('')
    console.error(merged)
  }
}

module.exports = { error, password }

/*
    let selection = password
    if (args.indices) {
      selection = args.indices.map(index => {
        return password.slice(index - 1, index)
      }).join('')
    }

*/
