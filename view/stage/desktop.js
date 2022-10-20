import { clearCharts } from '../../keyboard/keyboard.js';
import { viewDesktop } from '../generate/protocol.js';

export async function resultsViewStageDes(ctx, charts, title) {
	try {
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
