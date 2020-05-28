#!/usr/bin/env node

'use strict'

var packageJson = require('../../package.json')

const doc = `
Usage:
  polonium create <salt> [-l <num> | --len <num>] [-r <num> | --rounds <num>] [--line] [-i <csv> | --indices <csv>] [-d <str> | --digest <str>]
  polonium get <salt>    [-l <num> | --len <num>] [-r <num> | --rounds <num>] [--line] [-i <csv> | --indices <csv>] [-d <str> | --digest <str>]
  polonium (-h | --help | --version)

Security Note:
  By default, this password uses SHA1 hash digests. This will be changed in future, for the moment please specify a better
  digest like sha512

Description:
  Polonium is a stateless password manager based on PBKDF2. Polonium is 'stateless' in that
  it uses a deterministic function to create and retrieve passwords; for any particular salt and master password
  it always generates a particular derived password. For example,

    polonium get google (with master password 'supersolidsecurepassword')

  always generates the derived password:

    r5PPu6bYdWJEqI8gtLbOYorTnhT

  This means that if you remember your master password, the application you use the password for, and any
  additional arguments you pass to polonium you can retrieve your generated passwords.

  Polonium generates base62 alphanumeric passwords, which are accepted by most websites & are fairly
  information-dense compared to hex photos.

  If you use 'password1' as your master password, your derived passwords will be easy to guess if attackers
  know the password was made with polonium. If they don't, your derived passwords will still be secure, even
  though they were made by a bad master password.

  Polonium is intentionally slow; the simplest way to protect passwords from being guessed through exhaustive
  search is to make each guess slow.

Arguments:
  <salt>        A string unique to a particular application or website.
                Making the salt unpredicatable & secret increases the security
                of your password. It is not critical that your salt be kept secret; you can use
                the name of an application or site as your salt.

Options:
  -l <num>, --len <num>        [default: 20] The length of the new output password.
                                 Longer passwords are more secure. For memorisability it is not recommended
                                 to change this parametre unless a shorted password is required by an app.
  -r <num>, --rounds=<num>     [default: 1000000] The number of rounds of hashing to use.
                                 More rounds make brute force attacks more costly for the attacker.
                                 and increases the security of your password. It is highly unrecommended
                                 to lower this value below 100,000.
  -i <csv>, --indices <csv>    Comma-delimited indices within the password to select. This is included to
                                 make it easy to fetch specific characters from bank passwords etc.
  --line                       Print each charecter on a new line, with a line-number
  -d <str>, --digest <str>     The password digest to use [default: sha1]
  --version                    Show the current version number.

Authors:
  ${packageJson.author}
Version:
  v${packageJson.version}
Copyright:
  The MIT License
  Copyright (c) 2020 Róisín Grannell
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit
  persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
  OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
`

const docopt = require('docopt').docopt
const polonium = require('../app/polonium')

const args = docopt(doc)

polonium(args)
