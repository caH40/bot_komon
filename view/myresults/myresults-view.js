import { mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Stage } from '../../Model/Stage.js';
import { secondesToTime } from '../../utility/date-convert.js';
import { myResultsViewDes } from './desktop.js';
import { myResultsViewMob } from './mobile.js';

export async function myResults(ctx, cbqData) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗`,
			await mainMenuKeyboard(ctx)
		);
		const view = cbqData.slice(0, 3);

		const userId = ctx.update.callback_query.message.chat.id;

		const riderDB = await Rider.findOne({ telegramId: userId });
		if (!riderDB) {
			return await ctx.reply(
				'Вы не зарегистрировались в боте. Для корректного отображения информации необходимо зарегистрироваться!'
			);
		}

		let resultsDB = await Result.find({ riderId: riderDB._id })
			.populate('stageId')
			.populate({ path: 'stageId', populate: { path: 'seriesId' } })
			.populate('riderId');

		if (resultsDB.length === 0) {
			return await ctx.reply(
				'Ваши результаты не найдены!\nЕсли Вы участвовали в заездах проводимых командой KOM-on, попробуйте изменить данные в аккаунте (регистрация) на валидные.'
			);
		}

		let myResultsObj = [];

		resultsDB.forEach((result, index) => {
			const resultStage = {
				sequenceNumber: index + 1,
				name: index + 1,
				nameSeries: result.stageId.seriesId.name,
				dateStart: new Date(result.stageId.dateStart).toLocaleDateString(),
				stageNumber: result.stageId.number,
				stageRoute: result.stageId.route,
				time: secondesToTime(result.time),
				placeAbsolute: result.placeAbsolute,
			};
			myResultsObj.push(resultStage);
		});

		const gender = riderDB.gender === 'мужской' ? `🧔‍♂️` : `👩`;

		const title = `${gender} <i>${riderDB.lastName} ${riderDB.firstName}</i>. Результаты: \n`;

		if (view === 'Des') return myResultsViewDes(ctx, myResultsObj, title);
		if (view === 'Mob') return myResultsViewMob(ctx, myResultsObj, title);
		return true;
	} catch (error) {
		console.log(error);
	}
}
