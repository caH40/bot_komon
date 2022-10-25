import {
	adminCatRidersKeyboard,
	teamForApprovalKeyboard,
	teamKeyboard,
} from '../../keyboard/keyboard.js';
import { Rider } from '../../Model/Rider.js';
import { Team } from '../../Model/Team.js';

export async function requestTeam(ctx) {
	try {
		const teamsDB = await Team.find({ isAllowed: false }).populate('capitan');
		if (teamsDB.length === 0) return await ctx.reply('Нет заявок на создание команды.');

		teamsDB.forEach(async team => {
			let title = `
Команда: "${team.name}";
Капитан: ${team.capitan.lastName} ${team.capitan.firstName};
Описание: ${team.description};

`;
			await ctx
				.reply(`${title}`, teamForApprovalKeyboard(team._id))
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		});

		return;
	} catch (error) {
		console.log(error);
	}
}
export async function approvalTeam(ctx, cbqData) {
	try {
		const action = cbqData.slice(13, 14);
		const teamId = cbqData.slice(15);

		const teamDB = await Team.findOne({ _id: teamId }).populate('capitan');
		if (action === 'Y') await Team.findOneAndUpdate({ _id: teamId }, { $set: { isAllowed: true } });
		if (action === 'N') {
			await Rider.findOneAndUpdate({ teamId }, { $unset: { teamId: 1 } });
			await Team.findOneAndDelete({ _id: teamId });
		}

		const time = new Date().toLocaleString();
		const title =
			action === 'Y'
				? `${time}. Создание команды "${teamDB.name}" одобрено!`
				: `${time}. Создание команды "${teamDB.name}" отклонено!`;

		await ctx.telegram.sendMessage(teamDB.capitan.telegramId, title);
		return await ctx
			.reply(title)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
	} catch (error) {
		console.log(error);
	}
}
export async function riderCategory(ctx, text) {
	try {
		try {
			const riders = [];
			const ridersDB = await Rider.find({ lastName: { $regex: text } });

			for (let index = 0; index < ridersDB.length; index++) {
				riders.push(ridersDB[index]);
			}

			if (riders.length > 5)
				return await ctx.reply(
					'Нашлось слишком много райдеров, сузьте поиск, увеличьте количество букв.  Для выхода /quit'
				);
			if (riders.length === 0)
				return await ctx.reply(
					`Ничего не нашлось.\nВвод необходимо осуществлять на кириллице начиная с заглавной буквы. Для выхода /quit`
				);

			riders.forEach(async rider => {
				await ctx
					.reply(
						`
Фамилия: <b>${rider.lastName}</b>
Имя: <b>${rider.firstName}</b>
Текущая категория: <b>${rider.category ? rider.category : 'не присвоена'}</b>
<b>Выберите новую категорию райдеру:</b>`,
						adminCatRidersKeyboard(rider._id)
					)
					.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
			});
			return await ctx.scene.leave();
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function assignCatRider(ctx, cbqData) {
	try {
		const category = cbqData.slice(11, 12);
		const riderId = cbqData.slice(13);

		const riderDB = await Rider.findOneAndUpdate({ _id: riderId }, { $set: { category } });

		if (!riderDB)
			return await ctx.reply('Произошла непредвиденная ошибка при сохранении категории...');

		const title = `Вы изменили категорию райдера с <b>"${
			riderDB.category ? riderDB.category : 'не присвоена'
		}"</b> на <b>"${category}"</b>`;

		await ctx
			.replyWithHTML(title)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));

		return await ctx.telegram.sendMessage(
			riderDB.telegramId,
			`Вам изменили категорию группы с  <b>"${
				riderDB.category ? riderDB.category : 'не присвоена'
			}"</b> на <b>"${category}"</b>`,
			{ parse_mode: 'html' }
		);
	} catch (error) {
		console.log(error);
	}
}
