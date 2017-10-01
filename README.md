Polonium v0.6.1
========

[![Inline docs](http://inch-ci.org/github/rgrannell1/polonium.svg?branch=master)](http://inch-ci.org/github/rgrannell1/polonium)

<img src="polonium.gif"> </img>

Polonium is a stateless password manager that creates
& retrieves passwords without storing them in a database.
The advantages to this approach are obvious; your database can't be
stolen, and you can get your passwords anywhere you can get polonium.

Polonium only requires you to remember one master password, from which it
derives subordinate passwords for your various service logins. Even if these
subordinate passwords are compromised the attacker cannot compromise your
master password.

### Requirements

* Ubuntu (possibly another Linux or UNIX), or Windows.
* Node.js >= v7.8.0

--------------------------------

### Linux Installation

#### - Polonium

To install polonium quickly, use:

```bash
sudo snap install polonium
```

To test polonium use

```
polonium create facebook
```

and

```
polonium get facebook
```

--------------------------------

### Windows Installation *

#### - Polonium

Run the following commands through Powershell:

```
git clone https://github.com/rgrannell1/polonium.git
cd polonium
npm install -g
```

To test polonium use

```
polonium create facebook
```

and

```
polonium get facebook
```

--------------------------------

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


### Licence

The MIT License

Copyright (c) 2014 Ryan Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
