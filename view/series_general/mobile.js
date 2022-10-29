import { clearCharts } from '../../keyboard/keyboard.js';
import { divisionChart } from '../../utility/chart-division.js';
import { viewMobile } from '../generate/general.js';

export async function resultsSeriesGeneralMob(ctx, resultsGeneral, category, name, type) {
	try {
		const title = `${name}, Ген.зачет,"${category}"`;

		await ctx
			.replyWithHTML(`<b>${title}</b>\n${viewMobile(resultsGeneral)}`, clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return true;
	} catch (error) {
		console.log(error);
	}
}
