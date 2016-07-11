#!/usr/bin/env node

"use strict"




var packageJson = require('../../package.json')





const doc = `
Usage:
    polo create <salt> [-l <num> | --len <num>] [-r <num> | --rounds <num>] [-i <csv> | --indices <csv>]
    polo get <salt>    [-l <num> | --len <num>] [-r <num> | --rounds <num>] [-i <csv> | --indices <csv>]
    polo (-h | --help | --version)

Version:

    v${packageJson.version}

Description:

    Polonium is a stateless password manager based on PBKDF2. Polonium is 'stateless' in that
    it uses a deterministic function to create and retrieve passwords; for any particular salt and master password
    it always generates a particular derived password. For example,

        polo get a (with master password 'a')

    always generates the new password

        fXWX6PmmyxtLU2WWl5vx

    This means that if you remember your master password, the application you use the password for, and any
    additional arguments you pass to polonium you can retrieve your generated passwords.

    Polonium generates base62 alphanumeric passwords. These have higher entropy than standard encodings like
    base16 and binary, and are more likely to be accepted by a website than base64 passwords.

    When creating a password it is important you create a password with at least 80 bits of entropy,
    preferably even higher. This makes your generated password resistant to being cracked. The same requirement
    is even more true of your master password.

    Polonium is a 'garbage-in, garbage-out' program. If you use 'password1' as your master password,
    your derived passwords will be easy to guess if attackers know the password was made with polonium. If
    they dont, your derived passwords will still be secure, even though they were made by a bad
    master password.

    Polonium is intentionally slow; the simplest way to protect passwords from
    being guessed through exhaustive search is to make each guess slow.

Arguments:
    <salt>          A string unique to a particular application or website.
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
    -i <csv>, --indices <csv>     Comma-delimited indices within the password to select. This is included to
                                 make it easy to fetch specific characters from bank passwords etc.
    --version                    Show the current version number.
`


const docopt   = require('docopt').docopt
const polonium = require('../app/polonium.js')

const args     = docopt(doc)





polonium(args)
