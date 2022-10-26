import { protocol, protocolChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktop(data) {
	try {
		const tableHeader = protocol.rowDLine + protocol.titles + protocol.rowDLine;
		let body = '';

		data.forEach(row => {
			const category = row.riderId ? row.riderId.category : row.categoryCurrent;
			body =
				body +
				'|' +
				format(String(category), rowSize.protocol.desktop.placeCategory) +
				format(row.name, rowSize.protocol.desktop.name) +
				format(row.teamCurrent, rowSize.protocol.desktop.teamCurrent) +
				format(String(row.time), rowSize.protocol.desktop.time) +
				format(row.gap === '00:00' ? '' : '+' + row.gap, rowSize.protocolTotal.desktop.gap) +
				format(
					row.gapPrev ? '+' + row.gapPrev : row.gapPrev,
					rowSize.protocolTotal.desktop.gapPrev
				) +
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
export function viewMobile(data) {
	try {
		const tableHeader =
			protocolChartMobile.rowDLine + protocolChartMobile.titles + protocolChartMobile.rowDLine;
		let body = '';

		data.forEach(row => {
			const category = row.riderId ? row.riderId.category : row.categoryCurrent;
			body =
				body +
				'|' +
				format(String(category), rowSize.protocol.mobile.placeCategory) +
				format(row.name, rowSize.protocol.mobile.name) +
				format(String(row.time), rowSize.protocol.mobile.time) +
				`\n`;
		});
		return `${tableHeader}${body}${protocolChartMobile.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
