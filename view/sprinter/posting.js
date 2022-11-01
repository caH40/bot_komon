import { clearCharts } from '../../keyboard/keyboard.js';
import { mainMenu } from '../../keyboard/main-menu.js';
import { generateView } from '../generate/sprinter.js';

export async function posting(ctx, sprinters, seriesName) {
	try {
		await mainMenu(ctx);

		const title = `${seriesName}, Спринтерский зачет ⚡`;

		await ctx
			.replyWithHTML(`<b>${title}</b>\n${generateView(sprinters)}`, clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return true;
	} catch (error) {
		console.log(error);
	}
}
