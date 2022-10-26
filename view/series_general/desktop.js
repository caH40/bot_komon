import { clearCharts } from '../../keyboard/keyboard.js';
import { divisionChart } from '../../utility/chart-division.js';
import { viewDesktop } from '../generate/general.js';

export async function resultsSeriesGeneralDes(ctx, resultsGeneral, category, name, type) {
	try {
		const title = `${name}, ${type}, Генеральный зачет, Категория "${category}"`;

		const charts = divisionChart(resultsGeneral);

		for (let i = 0; i < charts.length; i++) {
			await ctx
				.replyWithHTML(`<pre>${title}\n${viewDesktop(charts[i])}</pre>`, clearCharts)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}

		return true;
	} catch (error) {
		console.log(error);
	}
}
