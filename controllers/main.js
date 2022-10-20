import { mainMenuKeyboard } from '../keyboard/keyboard.js';

export async function mainMenu(ctx) {
	try {
		ctx.session.data = {};
		ctx.session.data.messagesIdForDelete = [];
		await ctx.replyWithHTML(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			mainMenuKeyboard
		);
	} catch (error) {
		console.log(error);
	}
}
