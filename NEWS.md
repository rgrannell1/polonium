
Polonium v0.2.1
----------------------------------------------------------------
Date: 2014 August 2

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
