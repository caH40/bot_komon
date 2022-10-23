import {
	mainMenuKeyboard,
	teamKeyboard,
	teamLeaveKeyboard,
	teamsKeyboard,
} from '../../keyboard/keyboard.js';
import { Rider } from '../../Model/Rider.js';
import { Team } from '../../Model/Team.js';

export async function teamMain(ctx) {
	try {
		const userId = ctx.update.callback_query.message.chat.id;
		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		if (!riderDB)
			return await ctx.replyWithHTML('Для этого меню необходима <b>регистрация!</b> 🆔');

		let title = riderDB.teamId?.name
			? `Команда "${riderDB.teamId?.name}" 💪`
			: '🤝 Пора присоединяться к команде или создать свою!';

		return await ctx.editMessageText(`<b>${title}</b>`, await teamKeyboard(riderDB));
	} catch (error) {
		console.log(error);
	}
}
export async function teamChooseForJoin(ctx, cbqData) {
	try {
		const teamId = cbqData.slice(24);
		const userId = ctx.update.callback_query.message.chat.id;

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
		return await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
	} catch (error) {
		console.log(error);
	}
}

export async function teamJoin(ctx) {
	try {
		const teamDB = await Team.find({ isAllowed: true });
		if (teamDB.length === 0)
			return await ctx
				.replyWithHTML('Очень странно, не создано ни одной команды 🤷‍♂️')
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return await ctx.editMessageText(
			`<b>📌 Список зарегистрированных команд</b>`,
			teamsKeyboard(teamDB)
		);
	} catch (error) {
		console.log(error);
	}
}

export async function teamCreate(ctx) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
		return await ctx.scene.enter('firstSceneCreateTeam');
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
