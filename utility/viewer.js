import { regexp, viewer } from '../modules/text.js';

export function viewDesktop(data) {
	try {
		const tableHeader = viewer.rowDLine + viewer.titles + viewer.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(row.name, 'name') +
				format(row.team, 'team') +
				format(row.time, 'time') +
				format(row.gap, 'gap') +
				format(row.placeAbsolute, 'placeAbsolute') +
				format(row.placeCategory, 'placeCategory') +
				format(row.pointsStage, 'pointsStage') +
				format(row.watt, 'watt') +
				format(row.wattPerKg, 'wattPerKg') +
				`\n`;
		});
		return `<pre>${tableHeader}${body}${viewer.rowDLine}</pre>`;
	} catch (error) {
		console.log(error);
	}
}

function format(value, column) {
	try {
		//удаление всех emoji
		if (value) value = value.replace(regexp, '');
		//ширина столбцов
		const columns = {
			name: 25,
			team: 14,
			time: 11,
			gap: 7,
			placeAbsolute: 9,
			placeCategory: 9,
			pointsStage: 5,
			watt: 5,
			wattPerKg: 5,
		};
		if (!value) {
			let spaces = '';
			for (let i = 0; i < columns[column]; i++) {
				spaces += ' ';
			}
			return spaces + '|';
		}
		// убрать символы, которые не помещаются в столбец
		if (value.length > columns[column]) {
			return value.slice(0, 24) + '.' + '|';
		}
		// добавить символы до нужной ширины столбца
		if (value.length < columns[column]) {
			const missingSpaces = columns[column] - value.length;
			let spaces = '';
			for (let i = 0; i < missingSpaces; i++) {
				spaces += ' ';
			}
			return value + spaces + '|';
		}
		return value + '|';
	} catch (error) {
		console.log(error);
	}
}
