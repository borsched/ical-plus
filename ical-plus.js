const fs = require('fs');
const moment = require('moment');
const ical = require('ical');

parseFile = function(filename) {
	const data = fs.readFileSync(filename, 'utf8');
	return ical.parseICS(data);
}

print = function(parsed, blacklist, log) {
	let excluded = 'Excluded:\n';
	for (const event of Object.values(parsed)) {
		if (checkBlacklist(blacklist, event.summary)) {
			if (log) excluded += event.summary + '\n';
			continue;
		}
		const date = moment(event.start).format('MMMM Do YYYY');
		const start = moment(event.start).format('h:mmA');
		const end = moment(event.end).format('h:mmA');
		let time = '';
		if (start != end) {
			time = `Time: ${start} - ${end}\n`;
		}

		console.log(
			'Event: ' + event.summary.replace(/&nbsp;/g, ' ') +
			'\nDate: ' + date +
			'\n' + time
		);
	}
	if (log) {
		console.log(excluded);
	}
}

function checkBlacklist(blacklist, summary) {
	let flag = false;
	blacklist.forEach(item => {
		if (summary.includes(item) || summary.length <= 1) {
			flag = true;
		}
	});
	return flag;
}

module.exports = {
	parseFile,
	print
}

