import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Stage } from '../../Model/Stage.js';
import { myResultsViewDes } from './desktop.js';

export async function myResults(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);

		const userId = ctx.update.callback_query.message.chat.id;

		const riderDB = await Rider.findOne({ telegramId: userId });
		if (!riderDB) {
			return await ctx.reply(
				'Вы не зарегистрировались в боте. Для корректного отображения информации необходимо зарегистрироваться!'
			);
		}

		let resultsDB = await Result.find({ riderId: riderDB._id });

		if (resultsDB.length === 0) {
			return await ctx.reply(
				'Ваши результаты не найдены!\nЕсли Вы участвовали в заездах проводимых командой KOM-on, попробуйте изменить данные в аккаунте (регистрация) на валидные.'
			);
		}

		myResults = resultsDB.map(result => result.toObject());
		//получение уникальных stageId в которых участвовал райдер
		let stageIds = new Set();
		myResults.forEach(result => stageIds.add(result.stageId));
		stageIds = Array.from(stageIds);

		//подсчет количество участников

		for (let i = 0; i < stageIds.length; i++) {
			let stageDb = await Stage.findOne({ _id: stageIds[i] }).populate('seriesId');
			for (let j = 0; j < myResults.length; j++) {
				myResults[j].sequenceNumber = i + 1;
				myResults[j].nameSeries = stageDb.seriesId.name;
				myResults[j].dateStart = new Date(stageDb.seriesId.dateStart).toLocaleDateString();
				myResults[j].number = stageDb.number;
				myResults[j].type = stageDb.type;
			}
		}

		for (let i = 0; i < stageIds.length; i++) {
			let resultsDb = await Result.find({ stageIds: stageIds[i] });
			for (let j = 0; j < myResults.length; j++) {
				if (myResults[j].stageId === stageIds[i]) {
					myResults[j].quantityRiders = resultsDb.length;
				}
			}
		}

		const name = myResults[0].name;
		const title = `Результаты ${name}`;

		if (view === 'Des') return myResultsViewDes(ctx, myResults, title);
		// if (view === 'Mob') return resultsViewStageMob(ctx, charts, title);
	} catch (error) {
		console.log(error);
	}
}
