import { clearCharts } from '../../keyboard/keyboard.js';
import { divisionChart } from '../../utility/chart-division.js';
import { viewDesktop } from '../generate/result-teams.js';

export async function resultTeamDes(ctx, results, series) {
	try {
		const title = `Командный зачет ${series}`;

		const charts = divisionChart(results);

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
