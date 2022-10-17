import { Series } from '../../Model/Series.js';
import { scheduleKeyboard } from '../keyboard.js';

export async function scheduleBtn() {
	try {
		const seriesDB = await Series.find();
		return scheduleKeyboard(seriesDB);
	} catch (error) {
		console.log(error);
	}
}
