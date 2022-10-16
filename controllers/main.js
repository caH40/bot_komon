import { mainMenuKeyboard } from '../keyboard/keyboard.js';

export async function mainMenu(ctx) {
	try {
		await ctx.replyWithHTML(`Главное меню`, mainMenuKeyboard);
	} catch (error) {
		console.log(error);
	}
}
