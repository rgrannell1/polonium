Polonium
========

deterministic password generation


### Requirements

### Installation

First, grab the repository from Github.

```
git clone https://github.com/rgrannell1/polonium
cd polonium
```

now you can test the program with

### Details

Polonium is a shallow wrapper around node.js's implementation of 
Password-Based Key Derivation Function 2 (PBKDF2), 

You must not use your master password anywhere it is likely to be
compromised; all polonium-derived passwords will instantly be cracked 
in this case.

A good, XKCD-approved method of making a master password is to take you favourite large
dictionary - for example the Oxford English Dictionary - and choose four 
or more random words as your password. 

<img src="http://imgs.xkcd.com/comics/password_strength.png" title="To anyone who understands information theory and security and is in an infuriating argument with someone who does not (possibly involving mixed case), I sincerely apologize." alt="Password Strength" width="500" />

If the attacked knows your choice of dictionary they will have an infeasible
search space of >10^20 possible passwords; if they do not know then the odds
are even less in their favour.

Polonium generates base-62 (alphanumeric) passwords.

Polonium-based passwords are extremely resistant to brute-force attacks

```
polo create facebook
```

### Licence

The MIT License

Copyright (c) 2014 Ryan Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Versioning

Versioning complies with the Semantic Versioning 2.0.0 standard.

http://semver.org/



