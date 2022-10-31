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
				format(String(row.stageNumber), rowSize.myResults.desktop.number) +
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
			body = `${body}${row.sequenceNumber}. <u>${row.dateStart}</u>\n🏆 ${row.nameSeries}\n📢 Этап: №${row.stageNumber}\n🔁 Маршрут: ${row.stageRoute}\n🏁 Время: ${row.time}\n🏅 Место в абсолюте: ${row.placeAbsolute};\n\n`;
		});
		return body;
	} catch (error) {
		console.log(error);
	}
}
