import { mainMenuKeyboard } from '../keyboard/keyboard.js';
import { Rider } from '../Model/Rider.js';

export async function teamAddRiderDB(ctx, cbqData) {
	try {
		const riderId = cbqData.slice(12);
		console.log(riderId);

		const riderDB = await Rider.findOneAndUpdate(
			{ telegramId: userId },
			{ $set: { teamId: teamId } },
			{ returnDocument: 'after' }
		);
		if (riderDB.teamId) {
			await ctx
				.reply('Вы присоединились к команде!')
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		} else {
			await ctx
				.retry(
					'Что то пошло не так, произошла ошибка! Попробуйте повторить операцию через некоторое время.'
				)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}
	} catch (error) {
		console.log(error);
	}
}
