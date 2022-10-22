import { teamKeyboard } from '../../keyboard/keyboard.js';
import { Rider } from '../../Model/Rider.js';

export async function teamMain(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		if (!riderDB)
			return await ctx.replyWithHTML('Для этого меню необходима <b>регистрация!</b> 🆔');

		let title = riderDB.teamId?.name
			? `Команда riderDB.teamId?.name 💪`
			: 'Пора вступать или создать свою команду! 🤝';
		console.log(title);

		// const stagesDB = await Stage.find({ seriesId, hasResults: true });

		return await ctx.editMessageText(`<b>${title}</b>`, teamKeyboard);
	} catch (error) {
		console.log(error);
	}
}
