import path from 'path';
import XLSX from 'xlsx';
import { changeTitles } from '../../utility/excel.js';
import { checkFileName } from '../name-check.js';

export async function getExcel(ctx, fileName) {
	try {
		const isPassed = await checkFileName(ctx, fileName);
		if (!isPassed) return console.log('Наименование файла протокола не прошло проверку');

		const __dirname = path.resolve();

		const book = XLSX.readFile(path.resolve(__dirname, 'src/', `./${fileName}`));

		const sheetName = 'stage';
		const sheet = book.Sheets[sheetName];
		if (!sheet) {
			await ctx.reply(`В книге нет страницы ${sheetName}!`);
			return;
		}

		const keys = Object.keys(sheet);
		const rowTitle = getCellTitle(keys, sheet, 'Имя участника').slice(1) - 1;
		const total = XLSX.utils.sheet_to_json(sheet, { range: rowTitle, raw: false });

		const dataStage = changeTitles(total);

		return dataStage;
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
