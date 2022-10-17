import path from 'path';
import XLSX from 'xlsx';

export async function getExcel(ctx, fileName) {
	try {
		const __dirname = path.resolve();

		var book = XLSX.readFile(path.resolve(__dirname, 'src/schedule/', `./${fileName}`));

		const sheetName = 'series';
		const sheet = book.Sheets[sheetName];
		if (!sheet) {
			await ctx.reply(`В книге нет страницы ${sheetName}!`);
			return;
		}

		const keys = Object.keys(sheet);
		const rowTitle = getCellTitle(keys, sheet, 'Ссылка на заезд в Звифте').slice(1) - 1;
		const total = XLSX.utils.sheet_to_json(sheet, { range: rowTitle, raw: false });

		const totalClear = total.map(elm => {
			return {
				number: elm['Этап'],
				dateStart: elm['Дата'],
				timeStart: elm['Время'],
				world: elm['Мир'],
				route: elm['Маршрут'],
				laps: elm['Количество кругов'],
				distance: elm['Общая протяженность, км'],
				ascent: elm['Общий набор высотты, м'],
				type: elm['Тип заезда'],
				link: elm['Ссылка на заезд в Звифте'],
			};
		});

		return totalClear;
	} catch (error) {
		console.log(error);
	}
}

function getCellTitle(keys, sheet, title) {
	try {
		for (let i = 0; i < keys.length; i++) {
			if (sheet[keys[i]].v === title) {
				let cellTitle = keys[i];
				return cellTitle;
			}
		}
	} catch (error) {
		console.log(error);
	}
}
