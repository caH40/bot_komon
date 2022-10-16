import path from 'path';
import XLSX from 'xlsx';

export async function getExcel() {
	const __dirname = path.resolve();

	var book = XLSX.readFile(path.resolve(__dirname, 'utility/xlsx/', './KOM.xlsx'));

	const sheet = book.Sheets['Stage 1'];

	const keys = Object.keys(sheet);
	const rowTitle = getCellTitle(keys, sheet, 'Имя участника').slice(1) - 1;
	const total = XLSX.utils.sheet_to_json(sheet, { range: rowTitle, raw: false });
	console.log(total);

	return;
}

function getCellTitle(keys, sheet, title) {
	for (let i = 0; i < keys.length; i++) {
		if (sheet[keys[i]].v === title) {
			let cellTitle = keys[i];
			return cellTitle;
		}
	}
}
