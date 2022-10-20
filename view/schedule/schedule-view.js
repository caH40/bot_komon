import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { scheduleViewDes } from './desktop.js';
import { scheduleViewMob } from './mobile.js';

export async function scheduleView(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const seriesId = cbqData.slice(13);

		const stagesDB = await Stage.find({ seriesId });
		const seriesDB = await Series.findOne({ _id: seriesId });
		const title = `${seriesDB.name}, ${seriesDB.type}`;

		if (view === 'Des') return scheduleViewDes(ctx, stagesDB, title);
		if (view === 'Mob') return scheduleViewMob(ctx, stagesDB, title);
	} catch (error) {
		console.log(error);
	}
}
