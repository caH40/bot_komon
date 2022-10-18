import { protocol } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { protocolDesktop } from '../../utility/chart-sizes.js';
import { secondesToTime } from '../../utility/date-convert.js';

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
				format(ternary(row.time), protocolDesktop.time) +
				format(row.gap, protocolDesktop.gap) +
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
function ternary(date) {
	return typeof date == 'number' ? secondesToTime(date) : date;
}
