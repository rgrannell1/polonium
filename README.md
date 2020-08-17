Polonium v1.2.0
========

<img src="polonium.gif"> </img>

Polonium is a stateless password manager that creates
& retrieves passwords without storing them in a database.
The advantages to this approach;

- your database can't be stolen
- you can get your passwords anywhere you can get polonium.

Polonium only requires you to remember one master password, from which it
derives subordinate passwords for your various service logins. Even if these
subordinate passwords are compromised the attacker cannot compromise your
master password.

## Usage

```sh
polonium get github
```

## Build

```
sudo snapcraft build --use-lxd
```

Note that most of the logic in this program is performed by https://github.com/rgrannell1/polonium-lib.

## Installation

### Snapcraft

To install polonium quickly, use:

```bash
sudo snap install polonium
```

### Git + NPM

Run the following commands through Powershell:

```sh
git clone https://github.com/rgrannell1/polonium.git
cd polonium
npm install -g
```

## Files

```
src/
  app/
    fetch-master-password.js     reads the master password interactively.
    polonium.js                  the core application.
    report.js                    displays an output password.
  cli/
    cli.js                       the cli implementation.
  commons/
    constants.js                 a file full of constants.
```

---

### Details

Polonium is a shallow wrapper around node.js's implementation of
Password-Based Key Derivation Function 2 (PBKDF2); all polonium adds is
a method of gathering command-line arguments and converting the derived
keys to base62.

For more information on PBKDF2 see the following resources:

* [Wikipedia Page](https://en.wikipedia.org/wiki/PBKDF2)

* [NIST Recommendations](http://csrc.nist.gov/publications/nistpubs/800-132/nist-sp800-132.pdf)

#### - Master Password

You must not use your master password anywhere it might be compromised; if your
master password is known to an attacker, all polonium-derived passwords can also be
cracked easily.

A good, XKCD-approved method of making a master password is to take you favourite large
dictionary - for example the Oxford English Dictionary - and choose five
or more random words as your password.

<img src="http://imgs.xkcd.com/comics/password_strength.png" title="To anyone who understands information theory and security and is in an infuriating argument with someone who does not (possibly involving mixed case), I sincerely apologize." alt="Password Strength" width="500" />

Taking the OED as an example, choosing five of its 170,000 words gets you 86 bits of entropy. If the
attacker does not know your choice of dictionary your security depends on the length of your
password.

#### - Iterations & Performance

Modern GPU-based cracking can make billions of attempts a day at password cracking, so even
passwords made by secure hashing algorithms can be cracked quickly. Polonium, or more accurately PBKDF2,
uses key-stretching to slow down brute force attacks.

High iteration counts waste the attacker's time and raises their electric bill, so polonium
spitefully defaults to a costly 1,000,000 iterations.

If this is too hard on your battery / device, set poloniums iterations to a number
preferably above 200,000 iterations.

#### - Password Encoding

Polonium passwords are base62-encoded. Although base16 and base64 are more common,
Base62 (alphanumeric) passwords are generally permitted by online services
and are entropy-dense compared to base16 passwords. Even short base62 passwords
exceed the recommended minimum of 80-bits of entropy per password.

### - Security Notes

Polonium passwords only have *application* specific salts, not user-specific salts.
Two users that share a salt ('facebook') and master password ('password123') will share
the same output password. For this and many other reasons, **use a unique master password.**

* Currently untested.


## Changelog

### v1.2.0 [ 2020 August 17 ]

**ENHANCEMENTS**
- Added group option to group passwords into discreet groups of characters.

### v1.1.0 [ 2020 March 29 ]

**ENHANCEMENTS:**
* Updated packages

### v1.0.0 [ 2019 June 15 ]

**ENHANCEMENTS:**

- Added slightly more documentation about the default SHA hash
- Added a `--line` option, which prints each character of a password along with it's indices

**PACKAGE-INTERNALS:**

- Remove Makefile & switched to NPM scripts
- Add `base` to snap package

### v0.5.1 [ 2015 February 14 ]

**ENHANCMENTS:**

- Ported more code to `use ES6
- Reduces poor code factoring and fixed poor folder `structure.
- Added short options for length and rounds `arguments.
- Removed (node-gyp depending) bignum package, refactoring to use a JS-only `package.

### v0.4.1 [ 2015 December 31 ]

ENHANCMENTS:

- Ported some code to use ES6 features.
- Updated package structure.
- Code now uses strict-mode.
- Minor updates to documentation.
- Added explicit npm version dependencies.
- Added (docker) installation testing.
- Added recommeded fields to package.json
- Fixed (accidental?) use of global variables.

### v0.3.1 [ 2014 August 27 ]

**ENHANCMENTS:**

- Made it much easier to install polonium on Ubuntu.

**PACKAGE-INTERNALS:**

- Seperated polonium's main function from it's docopt interface, to
help transition to using this package as a dependency for polonium-gui.
- Started adding unit tests for polonium.

### v0.2.1 [ 2014 August 22 ]

**ENHANCMENTS:**

- Officially declared support for Windows, though no actual code changes
were required.

**DOCUMENTATION:**

- Added installation instructions for Windows, not currently tested.

**BUG-FIXES:**

- Added a newline missing from the error message displayed when
the password prompt is exited.

### v0.2.0 [ 2014 August 18 ]

**BUG-FIXES:**

- Fixed a long-outstanding security issue in Polonium. Approximately
11% of salt-password pairs could not be correctly coerced to a base62
string for output. This update is not back compatible; you must reset
all polonium passwords.

### v0.1.0 [ 2014 June 4 ]

The initial release.

## Licence

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
