import { Stage } from '../Model/Stage.js';
import { convertDate } from '../utility/date-convert.js';

export async function scheduleToDB(data) {
	try {
		const length = data.length;
		for (let index = 0; index < length; index++) {
			let stage = new Stage({
				number: data[index].number,
				dateStart: convertDate(data[index].dateStart),
				world: data[index].world,
				route: data[index].route,
				laps: data[index].laps,
				distance: data[index].distance,
				ascent: data[index].ascent,
				type: data[index].type,
				link: data[index].link,
			});
			await stage.save().catch(error => console.log(error));
		}
	} catch (error) {
		console.log(error);
	}
}
