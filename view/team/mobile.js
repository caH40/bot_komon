import { clearCharts } from '../../keyboard/keyboard.js';
import { viewMobile } from '../generate/riders.js';

export async function listRidersViewMob(ctx, riders, title) {
	try {
		await ctx
			.replyWithHTML('<pre>' + viewMobile(riders, title) + '</pre>', clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
