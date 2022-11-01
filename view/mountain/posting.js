import { clearCharts } from '../../keyboard/keyboard.js';
import { mainMenu } from '../../keyboard/main-menu.js';
import { generateView } from '../generate/mountain.js';

export async function posting(ctx, mountains, seriesName) {
	try {
		await mainMenu(ctx);

		const title = `${seriesName}, Горный зачет ⛰️`;

		await ctx
			.replyWithHTML(`<b>${title}</b>\n${generateView(mountains)}`, clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return true;
	} catch (error) {
		console.log(error);
	}
}
