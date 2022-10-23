import { mainMenuKeyboard } from '../keyboard/keyboard.js';
import { Rider } from '../Model/Rider.js';

export async function teamRemoveRiderDB(ctx, cbqData) {
	try {
		const riderId = cbqData.slice(12);

		const response = await Rider.findOneAndUpdate(
			{ _id: riderId },
			{ $unset: { teamId: 1 } },
			{ returnDocument: 'after' }
		);
		if (!response.teamId)
			await ctx
				.reply('Вы удалили райдера из состава команды!')
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return;
	} catch (error) {
		console.log(error);
	}
}
