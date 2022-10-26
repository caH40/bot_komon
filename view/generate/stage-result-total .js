import { protocol, protocolChartMobile, protocolChartMobileTotal } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktopTotal(data) {
	try {
		const tableHeader = protocol.rowDLine + protocol.titles + protocol.rowDLine;
		let body = '';

		data.forEach(row => {
			const category = row.category ? row.category : row.categoryCurrent;
			body =
				body +
				'|' +
				format(row.name, rowSize.protocol.desktop.name) +
				format(row.teamCurrent, rowSize.protocol.desktop.teamCurrent) +
				format(String(row.time), rowSize.protocol.desktop.time) +
				format(row.gap, rowSize.protocol.desktop.gap) +
				format(row.gapPrev, rowSize.protocol.desktop.gapPrev) +
				format(String(row.placeAbsolute), rowSize.protocol.desktop.placeAbsolute) +
				format(category, rowSize.protocol.desktop.category) +
				format(String(row.placeCategory), rowSize.protocol.desktop.placeCategory) +
				format(String(row.pointsStage), rowSize.protocol.desktop.pointsStage) +
				format(String(row.watt), rowSize.protocol.desktop.watt) +
				format(String(row.wattPerKg), rowSize.protocol.desktop.wattPerKg) +
				`\n`;
		});
		return `${tableHeader}${body}${protocol.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
export function viewMobileTotal(data) {
	try {
		const tableHeader =
			protocolChartMobileTotal.rowDLine +
			protocolChartMobileTotal.titles +
			protocolChartMobileTotal.rowDLine;
		let body = '';

		data.forEach(row => {
			const category = row.category ? row.category : row.categoryCurrent;
			body =
				body +
				'|' +
				format(String(row.placeAbsolute), rowSize.protocolTotal.mobile.placeAbsolute) +
				format(row.name, rowSize.protocolTotal.mobile.name) +
				format(String(row.time), rowSize.protocolTotal.mobile.time) +
				format(category, rowSize.protocolTotal.mobile.category) +
				`\n`;
		});
		return `${tableHeader}${body}${protocolChartMobile.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
