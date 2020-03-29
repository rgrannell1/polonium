
const tap = require('tap')
const report = require('../src/app/report')

const tests = {}

tests.error = () => {

}

tests.password = () => {

}

tests.selectPassword = () => {
  const result = report.selectPassword('teststring', [1, 2, 3])

  tap.equal(result[0].char, 't')
  tap.equal(result[0].index, 1)
  tap.equal(result[0].ith, 0)

  tap.equal(result[1].char, 'e')
  tap.equal(result[1].index, 2)
  tap.equal(result[1].ith, 1)

  tap.equal(result[2].char, 's')
  tap.equal(result[2].index, 3)
  tap.equal(result[2].ith, 2)

}

tests.error()
tests.password()
tests.selectPassword()
