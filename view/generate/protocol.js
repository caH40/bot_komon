import { protocol } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { protocolDesktop } from '../../utility/chart-sizes.js';

export function viewDesktop(data) {
	try {
		const tableHeader = protocol.rowDLine + protocol.titles + protocol.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(row.name, protocolDesktop.name) +
				format(row.team, protocolDesktop.team) +
				format(row.time, protocolDesktop.time) +
				format(row.gap, protocolDesktop.gap) +
				format(row.placeAbsolute, protocolDesktop.placeAbsolute) +
				format(row.placeCategory, protocolDesktop.placeCategory) +
				format(row.pointsStage, protocolDesktop.pointsStage) +
				format(row.watt, protocolDesktop.watt) +
				format(row.wattPerKg, protocolDesktop.wattPerKg) +
				`\n`;
		});
		return `${tableHeader}${body}${protocol.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}
