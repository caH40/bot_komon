import { clearCharts, mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { generateView } from '../generate/general.js';

export async function posting(ctx, resultsGeneral, category, name) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗`,
			await mainMenuKeyboard(ctx)
		);

		const title = `${name}, Ген.зачет,"${category}"`;

		await ctx
			.replyWithHTML(`<b>${title}</b>\n${generateView(resultsGeneral)}`, clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return true;
	} catch (error) {
		console.log(error);
	}
}
