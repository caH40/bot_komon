import { mainMenuKeyboard } from '../keyboard/keyboard.js';

export async function mainMenu(ctx) {
	try {
		ctx.session.data = {};
		ctx.session.data.messagesIdForDelete = [];
		await ctx.replyWithHTML(`Главное меню`, mainMenuKeyboard);
	} catch (error) {
		console.log(error);
	}
}
