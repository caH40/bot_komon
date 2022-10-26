import { mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { resultsSeriesGeneralDes } from './desktop.js';
import { resultsSeriesGeneralMob } from './mobile.js';

export async function resultsSeriesGeneral(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const seriesId = cbqData.slice(21);
		const category = cbqData.slice(19, 20);
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
		const stagesDB = await Stage.find({ seriesId, hasResults: true });
		const seriesIds = stagesDB.map(stage => stage._id);

		let resultsSeries = [];
		const lengthSeries = seriesIds.length;
		for (let index = 0; index < lengthSeries; index++) {
			let results = await Result.find({ stageId: seriesIds[index] }).populate('riderId');
			resultsSeries = [...resultsSeries, ...results];
		}

		// сначала необходимо найти все элементы с уникальными именами
		let zwiftRiderIds = new Set();
		let points = 0;
		resultsSeries.forEach(elm => zwiftRiderIds.add(elm.zwiftRiderId));

		let resultsGeneral = [];
		zwiftRiderIds.forEach(zwiftRiderId => {
			points = 0;
			resultsSeries.forEach(elm => {
				if (zwiftRiderId === elm.zwiftRiderId) points += elm.pointsStage;
			});
			resultsGeneral.push({ zwiftRiderId, pointsGeneral: points });
		});
		//в будущем брать данные по группе и команде из коллекции Riders

		resultsGeneral = resultsGeneral.map(rider => {
			const categoryFilter = resultsSeries.find(elm => elm.zwiftRiderId === rider.zwiftRiderId);

			const categoryNew = categoryFilter.riderId
				? categoryFilter.riderId?.category
				: categoryFilter.categoryCurrent;
			return {
				zwiftRiderId: rider.zwiftRiderId,
				pointsGeneral: rider.pointsGeneral,
				name: resultsSeries.find(elm => elm.zwiftRiderId === rider.zwiftRiderId).name,
				category: categoryNew,
				team: resultsSeries.find(elm => elm.zwiftRiderId === rider.zwiftRiderId).team ?? '',
			};
		});

		const { name, type } = await Series.findOne({ _id: seriesId });

		resultsGeneral = resultsGeneral
			.filter(rider => rider.category === category)
			.sort((a, b) => b.pointsGeneral - a.pointsGeneral);
		resultsGeneral.forEach((rider, index) => {
			rider.place = index + 1;
		});

		if (view === 'Des') return resultsSeriesGeneralDes(ctx, resultsGeneral, category, name, type);
		if (view === 'Mob') return resultsSeriesGeneralMob(ctx, resultsGeneral, category, name, type);
	} catch (error) {
		console.log(error);
	}
}
