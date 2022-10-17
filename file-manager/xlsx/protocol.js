import path from 'path';
import XLSX from 'xlsx';

export async function getExcel(ctx, fileName) {
	try {
		const __dirname = path.resolve();

		var book = XLSX.readFile(path.resolve(__dirname, 'src/', `./${fileName}`));

		const sheetName = 'Stage';
		const sheet = book.Sheets[sheetName];
		if (!sheet) {
			await ctx.reply(`В книге нет страницы ${sheetName}!`);
			return;
		}

		const keys = Object.keys(sheet);
		const rowTitle = getCellTitle(keys, sheet, 'Имя участника').slice(1) - 1;
		const total = XLSX.utils.sheet_to_json(sheet, { range: rowTitle, raw: false });
		const totalClear = total.map(elm => {
			return { name: elm['Имя участника'], time: elm['время'] };
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
