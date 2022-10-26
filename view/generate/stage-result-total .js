import {
	protocol,
	protocolChartMobile,
	protocolChartMobileTotal,
	protocolTotal,
} from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktopTotal(data) {
	try {
		const tableHeader = protocolTotal.rowDLine + protocolTotal.titles + protocolTotal.rowDLine;
		let body = '';

		data.forEach(row => {
			console.log(row);
			const category = row.riderId ? row.riderId.category : row.categoryCurrent;
			body =
				body +
				'|' +
				format(String(row.placeAbsolute), rowSize.protocolTotal.desktop.placeAbsolute) +
				format(row.name, rowSize.protocolTotal.desktop.name) +
				format(row.teamCurrent, rowSize.protocolTotal.desktop.teamCurrent) +
				format(String(row.time), rowSize.protocolTotal.desktop.time) +
				format(row.gap === '00:00' ? '' : '+' + row.gap, rowSize.protocolTotal.desktop.gap) +
				format(
					row.gapPrev ? '+' + row.gapPrev : row.gapPrev,
					rowSize.protocolTotal.desktop.gapPrev
				) +
				format(category, rowSize.protocolTotal.desktop.category) +
				format(String(row.placeCategory), rowSize.protocolTotal.desktop.placeCategory) +
				format(String(row.pointsStage), rowSize.protocolTotal.desktop.pointsStage) +
				format(String(row.watt), rowSize.protocolTotal.desktop.watt) +
				format(String(row.wattPerKg), rowSize.protocolTotal.desktop.wattPerKg) +
				`\n`;
		});
		return `${tableHeader}${body}${protocolTotal.rowDLine}`;
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
			const category = row.riderId ? row.riderId.category : row.categoryCurrent;
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
