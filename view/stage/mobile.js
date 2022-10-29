import { clearCharts } from '../../keyboard/keyboard.js';
import { viewMobileTotal } from '../generate/stage-result-total.js';
import { viewMobile } from '../generate/stage-result.js';

export async function resultsViewStageMob(ctx, charts, title, category) {
	try {
		if (category === 'T') {
			for (let i = 0; i < charts.length; i++) {
				await ctx
					.replyWithHTML(`<b>${title}</b>\n${viewMobileTotal(charts[i])}`, clearCharts)
					.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
			}
			return true;
		}

		for (let i = 0; i < charts.length; i++) {
			await ctx
				.replyWithHTML(`<b>${title}</b>\n${viewMobile(charts[i])}`, clearCharts)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}
		return true;
	} catch (error) {
		console.log(error);
	}
}
