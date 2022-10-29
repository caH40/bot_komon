import { myResultsChart, myResultsChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktop(data, title = '') {
	try {
		const tableHeader = myResultsChart.rowDLine + myResultsChart.titles + myResultsChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.sequenceNumber), rowSize.myResults.desktop.sequenceNumber) +
				format(row.nameSeries, rowSize.myResults.desktop.nameSeries) +
				format(String(row.dateStart), rowSize.myResults.desktop.dateStart) +
				format(String(row.number), rowSize.myResults.desktop.number) +
				format(row.type, rowSize.myResults.desktop.type) +
				format(String(row.placeAbsolute), rowSize.myResults.desktop.placeAbsolute) +
				format(String(row.placeCategory), rowSize.myResults.desktop.placeCategory) +
				format(String(row.quantityRiders), rowSize.myResults.desktop.quantityRiders) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${myResultsChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}

export function viewMobile(data) {
	try {
		let body = '';

		data.forEach(row => {
			body = `${body}${row.dateStart}, ${row.nameSeries}, этап: ${row.number}, место аб: ${row.placeAbsolute};\n`;
		});
		return body;
	} catch (error) {
		console.log(error);
	}
}
// export function viewMobile(data, title = '') {
// 	try {
// 		const tableHeader =
// 			myResultsChartMobile.rowDLine + myResultsChartMobile.titles + myResultsChartMobile.rowDLine;
// 		let body = '';

// 		data.forEach(row => {
// 			body =
// 				body +
// 				'|' +
// 				format(row.nameSeries, rowSize.myResults.mobile.nameSeries) +
// 				format(String(row.number), rowSize.myResults.mobile.number) +
// 				format(String(row.placeAbsolute), rowSize.myResults.mobile.placeAbsolute) +
// 				format(String(row.placeCategory), rowSize.myResults.mobile.placeCategory) +
// 				`\n`;
// 		});
// 		return `${title}\n${tableHeader}${body}${myResultsChartMobile.rowDLine}`;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
