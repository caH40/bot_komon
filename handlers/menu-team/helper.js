import {
	mainMenuKeyboard,
	teamKeyboard,
	teamLeaveKeyboard,
	teamManagementKeyboard,
	teamRemoveRiderKeyboard,
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
		const userId = ctx.update.callback_query.from.id;

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
export async function teamManagement(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;

		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		let teamName = riderDB.teamId?.name;

		return await ctx.editMessageText(
			`<b>💼 Управление командой "${teamName}"</b>`,
			teamManagementKeyboard(riderDB._id)
		);
	} catch (error) {
		console.log(error);
	}
}
export async function teamRemoveRider(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;

		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		let teamId = riderDB.teamId?._id;
		const ridersDB = await Rider.find({ $and: [{ teamId }, { _id: { $ne: riderDB._id } }] });

		if (ridersDB.length === 0)
			return await ctx
				.reply('Вы единственный райдер в команде, Вам некого удалять из команды!')
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		ridersDB.forEach(async rider => {
			let title = `
Райдер: ${rider.lastName} ${rider.firstName}
Звифт: ${rider.lastNameZwift} ${rider.firstNameZwift}
`;
			await ctx
				.reply(title, teamRemoveRiderKeyboard(rider._id))
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		});
	} catch (error) {
		console.log(error);
	}
}
export async function teamRemove(ctx) {
	try {
		const userId = ctx.update.callback_query.from.id;
		const riderDB = await Rider.findOne({ telegramId: userId }).populate('teamId');
		const ridersDB = await Rider.find({ teamId: riderDB.teamId._id });

		if (ridersDB.length > 1)
			return await ctx
				.reply(
					'Вы не можите удалить команду, если в ней есть райдеры. Сначала необходимо удалить райдеров из команды.'
				)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		await Team.findOneAndDelete({ _id: riderDB.teamId._id }).catch(error => console.log(error));
		await Rider.findOneAndUpdate({ telegramId: userId }, { $unset: { teamId: 1 } }).catch(error =>
			console.log(error)
		);

		await ctx
			.reply(`Вы удалили команду "${riderDB.teamId.name}"`)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
	} catch (error) {
		console.log(error);
	}
}
