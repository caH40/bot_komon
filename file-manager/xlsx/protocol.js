import path from 'path';
import XLSX from 'xlsx';
import { changeTitles } from '../../utility/excel.js';
import { checkFileName } from '../name-check.js';
import fs from 'fs';

export async function getProtocolFile(ctx, fileName) {
	try {
		const response = await checkFileName(ctx, fileName);
		if (!response.isPassed) return console.log('Наименование файла протокола не прошло проверку');

		if (response.fileType.toLowerCase() === 'json') {
			return await uploadJSON(ctx, fileName);
		}
		if (response.fileType.toLowerCase() === 'xlsx') {
			return await uploadXLSX(ctx, fileName);
		}
	} catch (error) {
		console.log(error);
	}
}

async function uploadXLSX(ctx, fileName) {
	try {
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

		total.forEach(result => (result['Вт\\кг'] = result['Вт\\кг'].replace(',', '.')));
		const dataStage = changeTitles(total);

		return dataStage;
	} catch (error) {
		console.log(error);
	}
}
async function uploadJSON(ctx, fileName) {
	try {
		const __dirname = path.resolve();
		let fileJson = fs.readFileSync(path.resolve(__dirname, 'src/', `./${fileName}`), 'utf8');
		// fileJson = fileJson[0];
		fileJson = JSON.parse(fileJson);

		const results = [];
		fileJson.forEach(result => {
			let resultRider = {
				zwiftRiderId: result.profileId,
				placeAbsolute: result.rank,
				name: `${result.profileData.firstName} ${result.profileData.lastName}`,
				wattPerKg:
					Math.round((result.sensorData.avgWatts / result.profileData.weightInGrams) * 100000) /
					100,
				watt: result.sensorData.avgWatts,
				weightInGrams: result.profileData.weightInGrams,
				heightInCentimeters: result.profileData.heightInCentimeters,
				avgHeartRate: result.sensorData.heartRateData.avgHeartRate,
				time: result.activityData.durationInMilliseconds,

				gender: result.profileData.gender,
				imageSrc: result.profileData.imageSrc,
			};
			results.push(resultRider);
		});
		return results;
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
