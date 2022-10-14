import { mainMenuKey } from '../keyboard/keyboard.js';

export async function mainMenu(ctx) {
	try {
		await ctx.replyWithHTML(`Главное меню`, mainMenuKey);
	} catch (error) {
		console.log(error);
	}
}
