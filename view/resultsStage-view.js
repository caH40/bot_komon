import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { divisionChart } from '../utility/chart-division.js';
import { viewDesktop } from './generate/protocol.js';

export async function resultsViewStage(ctx, cbqData) {
	try {
		const stageId = cbqData.slice(6);

		const stagesDB = await Stage.find({ _id: stageId });
		const resultsDB = await Result.find({ stageId });
		// const seriesDB = await Series.findOne({ _id: seriesId });
		// const title = `${seriesDB.name}, ${seriesDB.type}`;
		// const title = `${seriesDB.name}, ${seriesDB.type}`;
		const charts = divisionChart(resultsDB);
		for (let i = 0; i < charts.length; i++) {
			await ctx.replyWithHTML('<pre>' + viewDesktop(charts[i]) + '</pre>');
		}
		// await ctx.replyWithHTML('<pre>' + viewDesktop(resultsDB) + '</pre>');

		return;
	} catch (error) {
		console.log(error);
	}
}
