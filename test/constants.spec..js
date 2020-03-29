
const tap = require('tap')
const constants = require('../src/commons/constants')

const tests = {}

tests.exportType = () => {
  tap.equal(typeof constants === 'object' && constants !== null, true)
}

tests.exportType()
