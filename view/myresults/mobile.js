import { clearCharts, mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { viewMobile } from '../generate/my-results.js';

export async function myResultsViewMob(ctx, myResults, title) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
		await ctx
			.replyWithHTML('<pre>' + viewMobile(myResults, title) + '</pre>', clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
