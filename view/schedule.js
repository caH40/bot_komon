import { regexp, scheduleChart } from '../modules/text.js';

export function viewDesktop(data) {
	try {
		console.log(data);
		const tableHeader = scheduleChart.rowDLine + scheduleChart.titles + scheduleChart.rowDLine;
		let body = '';

		data.forEach(row => {
			body =
				body +
				'|' +
				format(row.number, 'number') +
				format(row.dateStart, 'dateStart') +
				format(row.world, 'world') +
				format(row.route, 'route') +
				format(row.laps, 'laps') +
				format(row.distance, 'distance') +
				format(row.ascent, 'ascent') +
				format(row.type, 'type') +
				format(row.link, 'link') +
				`\n`;
		});
		return `${tableHeader}${body}${scheduleChart.rowDLine}`;
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
			number: 1,
			dateStart: 10,
			world: 14,
			route: 17,
			laps: 3,
			distance: 5,
			ascent: 4,
			type: 8,
			link: 45,
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

export function divisionChart(data) {
	try {
		const newData = [];
		const quantityPath = Math.trunc(data.length / 36);
		let j = 0;
		let k = 36;
		for (let i = 0; i < quantityPath + 1; i++) {
			newData.push(data.slice(j, k));
			j += 36;
			k += 36;
		}

		return newData;
	} catch (error) {
		console.log(error);
	}
}
