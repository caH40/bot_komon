import {
	adminCatRidersFromStageKeyboard,
	adminCatRidersKeyboard,
	adminPointsSeriesKeyboard,
	mainMenuKeyboard,
	teamForApprovalKeyboard,
	teamKeyboard,
} from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { Team } from '../../Model/Team.js';
import { updatePointsGeneral } from '../../modules/points-general.js';
import { updateTeamName } from '../../modules/teamname-update.js';

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
export async function categoryRiderFromStage(ctx) {
	try {
		const stagesDB = await Stage.find({ hasResults: true }).populate('seriesId');
		return await ctx.editMessageText(
			'<b>🛠️ Выберите заезд по результатам которого будут присвоены категории ❗️ всем участникам заезда (зарегистрированным участникам).</b>',
			adminCatRidersFromStageKeyboard(stagesDB)
		);
	} catch (error) {
		console.log(error);
	}
}
export async function assignCategoryRiderFromStage(ctx, cbqData) {
	try {
		const stageId = cbqData.slice(11);

		let message = '';

		const ridersDB = await Rider.find();
		//обновление riderId в результатах, если не было
		for (let i = 0; i < ridersDB.length; i++) {
			await Result.updateMany(
				{ $and: [{ zwiftRiderId: ridersDB[i].zwiftId }, { riderId: null }] },
				{ $set: { riderId: ridersDB[i]._id } }
			);
		}

		const resultDB = await Result.find({ stageId });

		for (let i = 0; i < ridersDB.length; i++) {
			const res = await Result.updateMany(
				{ $and: [{ zwiftRiderId: ridersDB[i].zwiftId }, { riderId: null }] },
				{ $set: { riderId: ridersDB[i]._id } }
			);

			let newCategory = resultDB.find(
				result => result.riderId?.toString() === ridersDB[i]._id.toString()
			)?.categoryCurrent;

			const riderUpdated = await Rider.findOneAndUpdate(
				{ _id: ridersDB[i]._id },
				{ $set: { category: newCategory } },
				{ returnDocument: 'after' }
			);
			message += `${riderUpdated.lastName} ${riderUpdated.firstName} новая категория ${riderUpdated.category}\n`;
		}

		await ctx.reply(message);
	} catch (error) {
		console.log(error);
	}
}

export async function pointsSeries(ctx) {
	try {
		const seriesDB = await Series.find();
		return ctx.editMessageText(
			'<b>🔄 Обновление генеральных зачетов.\nВыберите серию в которой необходимо обновить очки в генеральной, спринторскойи горной номинациях.</b>',
			adminPointsSeriesKeyboard(seriesDB)
		);
	} catch (error) {
		console.log(error);
	}
}

export async function updatePointsSeries(ctx, cbqData) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗`,
			await mainMenuKeyboard(ctx)
		);

		const seriesId = cbqData.slice(9);
		const response = await updatePointsGeneral(seriesId);
		const teamName = await updateTeamName(seriesId);

		const seriesDB = await Series.findOne({ _id: seriesId });

		if (response) {
			ctx
				.reply(
					`${new Date().toLocaleString()}. Обновление очковых квалификаций серии ${
						seriesDB.name
					} прошло успешно!`
				)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		} else {
			await ctx
				.reply(
					`${new Date().toLocaleString()}. При обновление очковых квалификаций серии ${
						seriesDB.name
					} произошла непредвиденная ошибка...`
				)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}
	} catch (error) {
		console.log(error);
	}
}
