
Polonium v0.5.1
----------------------------------------------------------------
Date: 2015 February 14

ENHANCMENTS:

* Ported more code to use ES6

* Reduces poor code factoring and fixed poor folder structure.

* Added short options for length and rounds arguments.

* Removed (node-gyp depending) bignum package, refactoring to use a JS-only package.





Polonium v0.4.1
----------------------------------------------------------------
Date: 2015 December 31

ENHANCMENTS:

* Ported some code to use ES6 features.

* Updated package structure.

* Code now uses strict-mode.

* Minor updates to documentation.

* Added explicit npm version dependencies.

* Added (docker) installation testing.

* Added recommeded fields to package.json

* Fixed (accidental?) use of global variables.





Polonium v0.3.1
----------------------------------------------------------------
Date: 2014 August 27

ENHANCMENTS:

* Made it much easier to install polonium on Ubuntu.

PACKAGE-INTERNALS:

* Seperated polonium's main function from it's docopt interface, to
help transition to using this package as a dependency for polonium-gui.

* Started adding unit tests for polonium.







Polonium v0.2.1
----------------------------------------------------------------
Date: 2014 August 22

ENHANCMENTS:

* Officially declared support for Windows, though no actual code changes
were required.

DOCUMENTATION:

* Added installation instructions for Windows, not currently tested.

BUG-FIXES:

* Added a newline missing from the error message displayed when
the password prompt is exited.










Polonium v0.2.0
----------------------------------------------------------------
Date: 2014 August 18

BUG-FIXES:

* Fixed a long-outstanding security issue in Polonium. Approximately
11% of salt-password pairs could not be correctly coerced to a base62
string for output. This update is not back compatible; you must reset
all polonium passwords.











Polonium v0.1.0
----------------------------------------------------------------
Date: 2014 June 4

The initial release.
