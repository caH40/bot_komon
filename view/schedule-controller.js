import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { viewDesktopSeries } from './generate/series.js';

export async function schedule(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(9);

		const stagesDB = await Stage.find({ seriesId });
		const seriesDB = await Series.findOne({ _id: seriesId });
		const title = `${seriesDB.name}, ${seriesDB.type}`;

		await ctx.replyWithHTML('<pre>' + viewDesktopSeries(stagesDB, title) + '</pre>');

		return;
	} catch (error) {
		console.log(error);
	}
}
