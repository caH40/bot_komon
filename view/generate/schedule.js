import { scheduleChart, scheduleChartMobile } from '../../modules/text.js';
import { format } from '../../utility/chart-format.js';
import { rowSize } from '../../utility/chart-sizes.js';

export function viewDesktop(data, title = '') {
	try {
		const tableHeader = scheduleChart.rowDLine + scheduleChart.titles + scheduleChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(String(row.number), rowSize.schedule.desktop.number) +
				format(ternary(row.dateStart), rowSize.schedule.desktop.dateStart) +
				format(row.world, rowSize.schedule.desktop.world) +
				format(row.route, rowSize.schedule.desktop.route) +
				format(row.laps, rowSize.schedule.desktop.laps) +
				format(row.distance, rowSize.schedule.desktop.distance) +
				format(row.ascent, rowSize.schedule.desktop.ascent) +
				format(row.type, rowSize.schedule.desktop.type) +
				format(row.link, rowSize.schedule.desktop.link) +
				`\n`;
		});
		return `${title}\n${tableHeader}${body}${scheduleChart.rowDLine}`;
	} catch (error) {
		console.log(error);
	}
}

export function viewMobile(data, title = '') {
	try {
		let body = '';

		data.forEach(row => {
			let emoji = row.dateStart < new Date().getTime() ? '✅' : '❗';
			body = `${body}${emoji} <u>${ternary(row.dateStart)}</u> Этап №${row.number}, мир: ${
				row.world
			}, маршрут: ${row.route}, кругов ${row.laps}, ${row.distance}км, ${
				row.ascent
			}м, тип заезда: ${row.type}, <a href="${row.link}">Zwift</a>\n\n`;
		});
		return `🏆 <b>${title}</b> 🏆\n\n${body}`;
	} catch (error) {
		console.log(error);
	}
}
// export function viewMobile(data, title = '') {
// 	try {
// 		const tableHeader =
// 			scheduleChartMobile.rowDLine + scheduleChartMobile.titles + scheduleChartMobile.rowDLine;
// 		let body = '';

// 		data.forEach(row => {
// 			body =
// 				body +
// 				'|' +
// 				format(String(row.number), rowSize.schedule.mobile.number) +
// 				format(ternary(row.dateStart), rowSize.schedule.mobile.dateStart) +
// 				format(row.distance, rowSize.schedule.mobile.distance) +
// 				format(row.type, rowSize.schedule.mobile.type) +
// 				`\n`;
// 		});
// 		return `${title}\n${tableHeader}${body}${scheduleChartMobile.rowDLine}`;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

function ternary(date) {
	return typeof date == 'number' ? new Date(date).toLocaleDateString() : date;
}
