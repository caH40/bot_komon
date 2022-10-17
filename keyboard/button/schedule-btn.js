import { Series } from '../../Model/Series.js';
import { scheduleKeyboard } from '../keyboard.js';

export async function scheduleBtn() {
	try {
		const series = await Series.find();
		return scheduleKeyboard(series);
	} catch (error) {
		console.log(error);
	}
}
