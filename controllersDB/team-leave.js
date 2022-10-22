import { mainMenuKeyboard } from '../keyboard/keyboard.js';
import { Rider } from '../Model/Rider.js';

export async function teamLeaveDB(ctx, cbqData) {
	try {
		const riderId = cbqData.slice(23);
		const response = await Rider.findOneAndUpdate(
			{ _id: riderId },
			{ $unset: { teamId: 1 } },
			{ returnDocument: 'after' }
		);
		if (!response.teamId)
			await ctx
				.reply('Вы вышли из состава команды!')
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
	} catch (error) {
		console.log(error);
	}
}
