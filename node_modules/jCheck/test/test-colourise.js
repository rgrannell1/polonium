
const assert    = require('assert')
const colourise = require('../lib/colourise')

assert(colourise.red   ('test string').search('test.string') >= 0)
assert(colourise.black ('test string').search('test.string') >= 0)
assert(colourise.blue  ('test string').search('test.string') >= 0)
assert(colourise.green ('test string').search('test.string') >= 0)
assert(colourise.yellow('test string').search('test.string') >= 0)
