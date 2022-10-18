import { clearCharts } from '../keyboard/keyboard.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { viewDesktop } from './generate/schedule.js';

export async function scheduleView(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(9);

		const stagesDB = await Stage.find({ seriesId });
		const seriesDB = await Series.findOne({ _id: seriesId });
		const title = `${seriesDB.name}, ${seriesDB.type}`;

		await ctx
			.replyWithHTML('<pre>' + viewDesktop(stagesDB, title) + '</pre>', clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
