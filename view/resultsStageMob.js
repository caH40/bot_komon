import { clearCharts } from '../keyboard/keyboard.js';
import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { divisionChart } from '../utility/chart-division.js';
import { secondesToTime } from '../utility/date-convert.js';
import { viewMobile } from './generate/protocol.js';

export async function resultsViewStageMob(ctx, category, stageId) {
	try {
		const stagesDB = await Stage.find({ _id: stageId });
		const seriesId = stagesDB[0].seriesId;
		const seriesNumber = stagesDB[0].number;
		const seriesType = stagesDB[0].type;
		const { name } = await Series.findOne({ _id: seriesId });

		let resultsDB = [];
		// 'T' общий протокол
		if (category === 'T') {
			resultsDB = await Result.find({ stageId });
		} else {
			resultsDB = await Result.find({ stageId, category });
		}

		resultsDB = resultsDB.sort((a, b) => a.time - b.time);
		resultsDB = resultsDB.map(elm => elm.toObject());
		resultsDB.forEach(elm => (elm.time = secondesToTime(elm.time)));

		const title = `${name}, Этап ${seriesNumber}, ${seriesType}`;

		const charts = divisionChart(resultsDB);
		for (let i = 0; i < charts.length; i++) {
			await ctx
				.replyWithHTML(`<pre>${title}\n${viewMobile(charts[i])}</pre>`, clearCharts)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}
		return true;
	} catch (error) {
		console.log(error);
	}
}
