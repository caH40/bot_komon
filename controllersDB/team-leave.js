import { mainMenuKeyboard } from '../keyboard/keyboard.js';
import { Rider } from '../Model/Rider.js';
import { Team } from '../Model/Team.js';

export async function teamLeaveDB(ctx, cbqData) {
	try {
		const riderId = cbqData.slice(23);

		const teamDB = await Team.findOne({ capitan: riderId });
		if (teamDB)
			return await ctx
				.reply('Вы не можете покинуть команду, так как являетесь её создателем и капитаном.')
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

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
