import { Series } from '../../Model/Series.js';
import { resultSeriesKeyboard, scheduleKeyboard, seriesKeyboard } from '../keyboard.js';

export async function scheduleBtn() {
	try {
		const seriesDB = await Series.find();
		return scheduleKeyboard(seriesDB);
	} catch (error) {
		console.log(error);
	}
}
export async function seriesBtn() {
	try {
		const seriesDB = await Series.find();
		return seriesKeyboard(seriesDB);
	} catch (error) {
		console.log(error);
	}
}
export async function resultSeriesBtn(cbqData) {
	try {
		const seriesId = cbqData.slice(7);
		return resultSeriesKeyboard(seriesId);
	} catch (error) {
		console.log(error);
	}
}
