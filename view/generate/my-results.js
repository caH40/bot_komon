import { myResultsChart, myResultsChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { myResultsMobile, myResultsDesktop } from '../../utility/chart-sizes.js';

export function viewDesktop(data, title = '') {
	try {
		const tableHeader = myResultsChart.rowDLine + myResultsChart.titles + myResultsChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.sequenceNumber), myResultsDesktop.sequenceNumber) +
				format(row.nameSeries, myResultsDesktop.nameSeries) +
				format(String(row.dateStart), myResultsDesktop.dateStart) +
				format(String(row.number), myResultsDesktop.number) +
				format(row.type, myResultsDesktop.type) +
				format(String(row.placeAbsolute), myResultsDesktop.placeAbsolute) +
				format(String(row.placeCategory), myResultsDesktop.placeCategory) +
				format(String(row.quantityRiders), myResultsDesktop.quantityRiders) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${myResultsChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}

export function viewMobile(data, title = '') {
	try {
		const tableHeader =
			myResultsChartMobile.rowDLine + myResultsChartMobile.titles + myResultsChartMobile.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.number), myResultsMobile.number) +
				format(ternary(row.dateStart), myResultsMobile.dateStart) +
				format(row.distance, myResultsMobile.distance) +
				format(row.type, myResultsMobile.type) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${myResultsChartMobile.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}

function ternary(date) {
	return typeof date == 'number' ? new Date(date).toLocaleDateString() : date;
}
