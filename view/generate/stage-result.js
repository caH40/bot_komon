import { protocol, protocolChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { protocolDesktop, protocolMobile } from '../../utility/chart-sizes.js';

export function viewDesktop(data) {
	try {
		const tableHeader = protocol.rowDLine + protocol.titles + protocol.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(row.name, protocolDesktop.name) +
				format(row.teamCurrent, protocolDesktop.teamCurrent) +
				format(String(row.time), protocolDesktop.time) +
				format(row.gap, protocolDesktop.gap) +
				format(row.gapPrev, protocolDesktop.gapPrev) +
				format(String(row.placeAbsolute), protocolDesktop.placeAbsolute) +
				format(row.category, protocolDesktop.category) +
				format(String(row.placeCategory), protocolDesktop.placeCategory) +
				format(String(row.pointsStage), protocolDesktop.pointsStage) +
				format(String(row.watt), protocolDesktop.watt) +
				format(String(row.wattPerKg), protocolDesktop.wattPerKg) +
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
			body =
				body +
				'|' +
				format(row.name, protocolMobile.name) +
				format(String(row.time), protocolMobile.time) +
				format(String(row.placeCategory), protocolMobile.placeCategory) +
				format(row.category, protocolMobile.category) +
				`\n`;
		});
		return `${tableHeader}${body}${protocolChartMobile.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
