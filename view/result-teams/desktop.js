import { clearCharts } from '../../keyboard/keyboard.js';

import { viewDesktop } from '../generate/result-teams.js';

export async function resultTeamDes(ctx, results, series) {
	try {
		for (let i = 0; i < results.length; i++) {
			let title = `Командный зачет ${series}, "${results[i][0]?.category}"`;
			await ctx
				.replyWithHTML(`<pre>${title}\n${viewDesktop(results[i])}</pre>`, clearCharts)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}

		return true;
	} catch (error) {
		console.log(error);
	}
}
