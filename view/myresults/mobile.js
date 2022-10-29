import { clearCharts } from '../../keyboard/keyboard.js';
import { viewMobile } from '../generate/my-results.js';

export async function myResultsViewMob(ctx, myResults, title) {
	try {
		await ctx
			.replyWithHTML(`<b>${title}</b>\n${viewMobile(myResults)}`, clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
