import { teamKeyboard, teamLeaveKeyboard, teamsKeyboard } from '../../keyboard/keyboard.js';
import { Rider } from '../../Model/Rider.js';
import { Team } from '../../Model/Team.js';

export async function teamMain(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		if (!riderDB)
			return await ctx.replyWithHTML('Для этого меню необходима <b>регистрация!</b> 🆔');

		let title = riderDB.teamId?.name
			? `Команда "${riderDB.teamId?.name}" 💪`
			: '🤝 Пора присоединяться к команде или создать свою!';

		return await ctx.editMessageText(`<b>${title}</b>`, teamKeyboard(riderDB));
	} catch (error) {
		console.log(error);
	}
}
export async function teamJoin(ctx) {
	try {
		const teamDB = await Team.find();
		if (teamDB.length === 0)
			return await ctx.replyWithHTML('Очень странно, но ни одной команды не создано 🤷‍♂️').then(m => {
				ctx.session.data.messagesIdForDelete.push(m.message_id);
			});

		return await ctx.editMessageText(
			`<b>📌 Список зарегистрированных команд</b>`,
			teamsKeyboard(teamDB)
		);
	} catch (error) {
		console.log(error);
	}
}
export async function teamLeave(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		let teamName = riderDB.teamId?.name;

		return await ctx.editMessageText(
			`<b>🚪 Выход из команды "${teamName}"</b>`,
			teamLeaveKeyboard(riderDB._id)
		);
	} catch (error) {
		console.log(error);
	}
}
