import { scheduleChart } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { scheduleDesktop } from '../../utility/chart-sizes.js';

export function viewDesktop(data, title = '') {
	try {
		const tableHeader = scheduleChart.rowDLine + scheduleChart.titles + scheduleChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.number), scheduleDesktop.number) +
				format(ternary(row.dateStart), scheduleDesktop.dateStart) +
				format(row.world, scheduleDesktop.world) +
				format(row.route, scheduleDesktop.route) +
				format(row.laps, scheduleDesktop.laps) +
				format(row.distance, scheduleDesktop.distance) +
				format(row.ascent, scheduleDesktop.ascent) +
				format(row.type, scheduleDesktop.type) +
				format(row.link, scheduleDesktop.link) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${scheduleChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}

function ternary(date) {
	return typeof date == 'number' ? new Date(date).toLocaleDateString() : date;
}
