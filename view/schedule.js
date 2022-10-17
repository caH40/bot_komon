import { scheduleChart } from '../modules/text.js';
import { format } from '../utility/chart-format.js';
import { scheduleDesktop } from '../utility/chart-sizes.js';

export function viewDesktop(data) {
	try {
		const tableHeader = scheduleChart.rowDLine + scheduleChart.titles + scheduleChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(row.number, scheduleDesktop.number) +
				format(row.dateStart, scheduleDesktop.dateStart) +
				format(row.world, scheduleDesktop.world) +
				format(row.route, scheduleDesktop.route) +
				format(row.laps, scheduleDesktop.laps) +
				format(row.distance, scheduleDesktop.distance) +
				format(row.ascent, scheduleDesktop.ascent) +
				format(row.type, scheduleDesktop.type) +
				format(row.link, scheduleDesktop.link) +
				`\n`;
		});
		return `${tableHeader}${body}${scheduleChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
