import { general, generalChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { generalDesktop, generalMobile } from '../../utility/chart-sizes.js';

export function viewDesktop(data) {
	try {
		const tableHeader = general.rowDLine + general.titles + general.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.place), generalDesktop.place) +
				format(String(row.name), generalDesktop.name) +
				format(String(row.team), generalDesktop.team) +
				format(String(row.pointsGeneral), generalDesktop.pointsGeneral) +
				`\n`;
		});
		return `${tableHeader}${body}${general.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
export function viewMobile(data) {
	try {
		const tableHeader =
			generalChartMobile.rowDLine + generalChartMobile.titles + generalChartMobile.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.place), generalMobile.place) +
				format(String(row.name), generalMobile.name) +
				format(String(row.team), generalMobile.team) +
				format(String(row.pointsGeneral), generalMobile.pointsGeneral) +
				`\n`;
		});
		return `${tableHeader}${body}${generalChartMobile.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
