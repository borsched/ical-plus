# ical-plus
Pretty prints an iCalendar file.
# Installation
	npm i ical-plus
# Usage
Provide an array of blacklisted terms and whether to log the excluded events.
```
const ical = require('ical-plus');
ical.print(ical.parseFile('file.ics'), ['blacklist'], printBlacklist);
```
Anything that is one character or shorter is automatically blacklisted.

