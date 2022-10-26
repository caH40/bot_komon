import { clearCharts, mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { viewDesktop } from '../generate/schedule.js';

export async function scheduleViewDes(ctx, stagesDB, title) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗`,
			await mainMenuKeyboard(ctx)
		);
		await ctx
			.replyWithHTML('<pre>' + viewDesktop(stagesDB, title) + '</pre>', clearCharts)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
