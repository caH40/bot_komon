import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';
import textJson from '../../locales/ru.json' assert { type: 'json' };

export function viewDesktop(data) {
	try {
		const carts = textJson.charts.teamResults;
		const tableHeader = carts.line + carts.header + carts.line;
		let body = '';
		console.log(data);
		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.place), rowSize.teamResult.desktop.place) +
				format(String(row.name), rowSize.teamResult.desktop.name) +
				format(String(row.points), rowSize.teamResult.desktop.points) +
				`\n`;
		});
		return `${tableHeader}${body}${carts.line}`;
	} catch (error) {
		console.log(error);
	}
}
export function viewMobile(data) {
	try {
		let body = '';

		data.forEach(row => {
			body = `${body}${row.place}. ${row.name} - ${row.points}\n`;
		});
		return `${body}`;
	} catch (error) {
		console.log(error);
	}
}
