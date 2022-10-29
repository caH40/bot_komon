import { general, generalChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktop(data) {
	try {
		const tableHeader = general.rowDLine + general.titles + general.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.place), rowSize.general.desktop.place) +
				format(String(row.name), rowSize.general.desktop.name) +
				format(String(row.team), rowSize.general.desktop.team) +
				format(String(row.pointsGeneral), rowSize.general.desktop.pointsGeneral) +
				`\n`;
		});
		return `${tableHeader}${body}${general.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
export function viewMobile(data) {
	try {
		let body = '';
		data.forEach(row => {
			body = `${body}${row.place}. ${row.name}	${row.team} -	<b>${row.pointsGeneral}</b>\n`;
		});
		return `${body}`;
	} catch (error) {
		console.log(error);
	}
	// export function viewMobile(data) {
	// 	try {
	// 		const tableHeader =
	// 			generalChartMobile.rowDLine + generalChartMobile.titles + generalChartMobile.rowDLine;
	// 		let body = '';

	// 		data.forEach(row => {
	// 			body =
	// 				body +
	// 				'|' +
	// 				format(String(row.place), rowSize.general.mobile.place) +
	// 				format(String(row.name), rowSize.general.mobile.name) +
	// 				format(String(row.team), rowSize.general.mobile.team) +
	// 				format(String(row.pointsGeneral), rowSize.general.mobile.pointsGeneral) +
	// 				`\n`;
	// 		});
	// 		return `${tableHeader}${body}${generalChartMobile.rowDLine}`;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
}
