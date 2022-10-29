import { clearCharts, mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { viewMobile } from '../generate/schedule.js';

export async function scheduleViewMob(ctx, stagesDB, title) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗`,
			await mainMenuKeyboard(ctx)
		);
		await ctx
			.replyWithHTML(viewMobile(stagesDB, title), {
				disable_web_page_preview: true,
				...clearCharts,
			})
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
