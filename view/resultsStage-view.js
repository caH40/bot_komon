import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { divisionChart } from '../utility/chart-division.js';
import { viewDesktop } from './generate/protocol.js';

export async function resultsViewStage(ctx, cbqData) {
	try {
		const stageId = cbqData.slice(6);

		const stagesDB = await Stage.find({ _id: stageId });
		const { name, type } = await Series.findOne({ _id: stagesDB[0].seriesId });
		const resultsDB = await Result.find({ stageId });

		const title = `${name}, ${type}`;

		const charts = divisionChart(resultsDB);
		for (let i = 0; i < charts.length; i++) {
			await ctx.replyWithHTML(`<pre>'${title}\n${viewDesktop(charts[i])}</pre>`);
		}

		return;
	} catch (error) {
		console.log(error);
	}
}
