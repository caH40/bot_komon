import { teamRidersChart, teamRidersChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktop(data, title = '') {
	try {
		const tableHeader =
			teamRidersChart.rowDLine + teamRidersChart.titles + teamRidersChart.rowDLine;
		let body = '';

		data.forEach(row => {
			let name = `${row.lastName} ${row.firstName}`;
			body =
				body +
				'|' +
				format(String(row.sequence), rowSize.teamRiders.desktop.sequence) +
				format(name, rowSize.teamRiders.desktop.name) +
				format(String(row.quantity), rowSize.teamRiders.desktop.quantity) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${teamRidersChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}

export function viewMobile(data, title = '') {
	try {
		const tableHeader =
			teamRidersChartMobile.rowDLine +
			teamRidersChartMobile.titles +
			teamRidersChartMobile.rowDLine;
		let body = '';

		data.forEach(row => {
			let name = `${row.lastName} ${row.firstName}`;
			body =
				body +
				'|' +
				format(String(row.sequence), rowSize.teamRiders.mobile.sequence) +
				format(name, rowSize.teamRiders.mobile.name) +
				format(String(row.quantity), rowSize.teamRiders.mobile.quantity) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${teamRidersChartMobile.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
