import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { divisionChart } from '../utility/chart-division.js';
import { viewDesktop } from './generate/protocol.js';

export async function resultsViewStage(ctx, cbqData) {
	try {
		const category = cbqData.slice(13, 14);
		const stageId = cbqData.slice(15);

		const stagesDB = await Stage.find({ _id: stageId });
		const seriesId = stagesDB[0].seriesId;
		const seriesNumber = stagesDB[0].number;
		const seriesType = stagesDB[0].type;
		const { name, type } = await Series.findOne({ _id: seriesId });

		let resultsDB = [];
		if (category === 'T') {
			resultsDB = await Result.find({ stageId });
		} else {
			resultsDB = await Result.find({ stageId, category });
		}

		const title = `${name}, ${type}, Этап №${seriesNumber}, ${seriesType}`;

		const charts = divisionChart(resultsDB);
		for (let i = 0; i < charts.length; i++) {
			await ctx.replyWithHTML(`<pre>${title}\n${viewDesktop(charts[i])}</pre>`);
		}

		return true;
	} catch (error) {
		console.log(error);
	}
}
