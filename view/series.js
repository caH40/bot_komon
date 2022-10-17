import { seriesChart } from '../modules/text.js';
import { format } from '../utility/chart-format.js';
import { seriesDesktop } from '../utility/chart-sizes.js';

export function viewDesktopSeries(data) {
	try {
		const tableHeader = seriesChart.rowDLine + seriesChart.titles + seriesChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(row.organizer, seriesDesktop.organizer) +
				format(row.name, seriesDesktop.name) +
				format(row.dateStart, seriesDesktop.dateStart) +
				format(row.type, seriesDesktop.type) +
				`\n`;
		});
		return `${tableHeader}${body}${seriesChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
