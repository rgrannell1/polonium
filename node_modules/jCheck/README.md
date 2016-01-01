
jCheck v0.1.1 [![Build Status](https://travis-ci.org/rgrannell1/jCheck.png?branch=master)](https://travis-ci.org/rgrannell1/jCheck)
======

> "Some positive persisting fops we know,

> Who, if once wrong, will needs be always so;

> But you with pleasure own your errors past,

> And make each day a critique on the last."

> Alexander Pope.

You want to verify that your programs work. The best way to test any assumption is to try disprove it
by experimentation and only accept your assumption when no counterexample can be found.

Choosing good test-cases by hand is hard; you will be biased towards picking small test cases,
you will use a small sample-size, and testing known-corner cases is second best to testing
unknown corner cases, the real source of failures. Random sampling inputs is the only
reliable way to test.

The limiting factor to testing is your patience. Test-cases are data, and manually entering data
is boring. Properties are predicates, which aren't as boring to write. From experience, writing
test-case generators is difficult & difficulty biases towards writing simple generators and
omitting more complex cases.

jCheck is my attempt to add convenient, maximally-powerful testing to JavaScript. You won't deal with
test-case generation at all; you state the inputs a property should hold for, and jCheck verifies your
invariant property has no counterexamples.

## Installation.

#### - Dependencies

To install node.js on Ubuntu use

```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

Then to install jCheck, go to the top-level of your project and enter;

```bash
sudo npm install rgrannell1/jCheck
```

Then, add the following boilerplate to the top of your tests:

```js
const jCheck     = require('jCheck')
const over       = jCheck.over
const over_      = jCheck.over_
const describe   = jCheck.describe
const holdsWhen  = jCheck.holdsWhen
const holdsWhen_ = jCheck.holdsWhen_
const run        = jCheck.run
```

Or, if you always use `over_` as the entry point to your tests (which is not demanded of you)
simply use

```js
const over = require('jCheck').over
```

## Language.

jCheck has a small vocabulary. A jCheck test binds parametres — in this case 'a' and 'b' — to
random values. To prove invariants always hold true, properties such as predicates and known
failure functions are ran over a stream of random inputs. The tests run for a set timespan,
and the test-cases get longer and larger over time.

* **over, over_**: Bind several variables to random values.

* **describe**: Describe what an assertion proves about your programs.

* **holdsWhen, holdsWhen_**: When a predicate is true, assert that other predicates are true too.

* **failsWhen, failsWhen_**: When a predicate is true, assert that other functions always fail.

* **worksWhen, worksWhen_**: When a predicate is true, assert that other functions always run
without exception.

* **run**: Execute a test object.

Tests can be built-up in any order, though I prefer the test structure below. The exception to this
rule is that `run( )` must be the final method call in a test; attempts to place it elsewhere will
prematurely execute tests.

If a predicate fails (or a known-failure fails to fail) jCheck will simplify the errant
input to something smaller and easier to read.

## Example.

```js
var is = function (type, val) {
	return toString.call(val) === '[object ' + type + ']'
}

over_("num")

.describe("test that a number double-equals itself.")
.holdsWhen_(
	function (num) {return is("Number", num)},
	function (num) {return num == num}
)

.run()
```

This test was designed to fail, as there are corner-cases for which `num` is
oddly not equal to itself in JavaScript.

```js
Failed! after 1 test case.

"test that a number double-equals itself." failed!

function (num) {return num == num}

failed 1,007 times. Counterexample:

[ NaN ]
```

If you exclude NaN from your test-cases, you get the following message:

```
"test that a number double-equals itself." passed!                            (1,603     / 7,668     )
```

## Limitations.

As with most tests, jCheck tests are prone to false negatives;
a property passing suggests it works as expected, but only exhaustive search
can prove this.

While jCheck removes the problem of users selecting convenient test-cases over
illustrative ones, the onus is on you to test useful and general properties of
your programs; a useless property will say little. It is still possible to write
weak tests by excluding too many random test-cases.

Finally, jCheck is at present lousy at testing polyadic functions. jCheck filters
random-variables with a single predicate, rather than a predicate for each parametre.
This makes it take much longer to pick test-cases for functions with more than one parametre.

## License.

jCheck is released under the MIT licence.

The MIT License (MIT)

Copyright (c) 2014 Ryan Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Versioning.

All versions post-release will be compliant with the Semantic Versioning 2.0.0 standard.

http://semver.org/
