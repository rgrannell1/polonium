Polonium
========

Polonium is a stateless password generator & manager that creates
and retrieves passwords without storing them in a database.
The advantages to this approach are obvious; your database can't be
stolen, and no syncronisation is required between your devices.

Polonium only requires you to remember one master password, from which it
derives subordinate passwords for your various apps. Even if these subordinate
passwords are compromised the attacker cannot work backwards and discover
your master password.

### Requirements

### Installation

First, grab the repository from Github.

```
git clone https://github.com/rgrannell1/polonium
cd polonium
```

Run the following command.

```
sudo nano ~/.bashrc
```
add the line,

```
alias polo=path/to/polonium.py
```

and you're ready to go. Now you can test the program with

```
polo create facebook
```

and

```
polo get facebook
```

### Details

Polonium is a shallow wrapper around node.js's implementation of
Password-Based Key Derivation Function 2 (PBKDF2); all polonium adds is
a method of gathering command-line arguments, calculating arguments and
converting the derived keys to base62.

http://csrc.nist.gov/publications/nistpubs/800-132/nist-sp800-132.pdf

#### - Master Password

You must not use your master password anywhere it may be compromised; if your
master password is compromised, all polonium-derived passwords will also be
cracked.

A good, XKCD-approved method of making a master password is to take you favourite large
dictionary - for example the Oxford English Dictionary - and choose four
or more random words as your password.

<img src="http://imgs.xkcd.com/comics/password_strength.png" title="To anyone who understands information theory and security and is in an infuriating argument with someone who does not (possibly involving mixed case), I sincerely apologize." alt="Password Strength" width="500" />

If the attacker knows your dictionary they will still have an infeasible
search space of >10^20 possible passwords; if they do not know, the odds
are even less in their favour.

#### - Iterations & Performance

Modern GPU-based cracking can make billions of attempts a day at password cracking, so even
passwords made by secure hashing algorithms can be cracked quickly. Polonium, or more accurately PBKDF2,
uses key-stretching to slow down brute force attacks.


High iteration counts waste the attacker's time and raises their electric bill, so polonium
spitefully defaults to a costly 1,000,000 iterations.

If this is too hard on your battery / device, set polonium to a cosy number of
iteration 200,000 iterations.

#### - Password Encoding

Polonium passwords are base62-encoded. Although base16 and base64 are more common,
Base62 (alphanumeric) passwords are generally permitted by online services
and are entropy-dense compared to base16 passwords. Even short Base62 passwords
exceed the recommended minimum of 80-bits of entropy per password.

### Licence

The MIT License

Copyright (c) 2014 Ryan Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Versioning

Versioning complies with the Semantic Versioning 2.0.0 standard.

http://semver.org/



