import { clearCharts } from '../../keyboard/keyboard.js';
import { viewDesktop } from '../generate/riders.js';

export async function listRidersViewDes(ctx, riders, title) {
	try {
		await ctx
			.replyWithHTML('<pre>' + viewDesktop(riders, title) + '</pre>', clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
