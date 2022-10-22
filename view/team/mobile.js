import { clearCharts } from '../../keyboard/keyboard.js';
import { viewMobile } from '../generate/my-results.js';

export async function listRidersViewMob(ctx, myResults, title) {
	try {
		await ctx
			.replyWithHTML('<pre>' + viewMobile(myResults, title) + '</pre>', clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
