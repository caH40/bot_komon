import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Stage } from '../../Model/Stage.js';
import { myResultsViewDes } from './desktop.js';
import { myResultsViewMob } from './mobile.js';

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

		let myResultsObj = resultsDB.map(result => result.toObject());
		//получение уникальных stageId в которых участвовал райдер
		let stageIds = new Set();
		myResultsObj.forEach(result => stageIds.add(result.stageId));
		stageIds = Array.from(stageIds);

		//подсчет количество участников

		for (let i = 0; i < stageIds.length; i++) {
			let stageDb = await Stage.findOne({ _id: stageIds[i] }).populate('seriesId');
			for (let j = 0; j < myResultsObj.length; j++) {
				myResultsObj[j].sequenceNumber = i + 1;
				myResultsObj[j].nameSeries = stageDb.seriesId.name;
				myResultsObj[j].dateStart = new Date(stageDb.seriesId.dateStart).toLocaleDateString();
				myResultsObj[j].number = stageDb.number;
				myResultsObj[j].type = stageDb.type;
			}
		}

		for (let i = 0; i < stageIds.length; i++) {
			let resultsDb = await Result.find({ stageIds: stageIds[i] });
			for (let j = 0; j < myResultsObj.length; j++) {
				if (myResultsObj[j].stageId === stageIds[i]) {
					myResultsObj[j].quantityRiders = resultsDb.length;
				}
			}
		}

		const name = myResultsObj[0].name;
		const title = `Результаты ${name}`;

		if (view === 'Des') return myResultsViewDes(ctx, myResultsObj, title);
		if (view === 'Mob') return myResultsViewMob(ctx, myResultsObj, title);
		return true;
	} catch (error) {
		console.log(error);
	}
}
