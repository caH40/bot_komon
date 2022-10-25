import { clearCharts, mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { divisionChart } from '../../utility/chart-division.js';
import { viewDesktop } from '../generate/general.js';

export async function resultsSeriesGeneralDes(ctx, category, seriesId) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
		const stagesDB = await Stage.find({ seriesId, hasResults: true });
		const seriesIds = stagesDB.map(stage => stage._id);

		let resultsSeries = [];
		const lengthSeries = seriesIds.length;
		for (let index = 0; index < lengthSeries; index++) {
			let results = await Result.find({ stageId: seriesIds[index] });
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
			return {
				zwiftRiderId: rider.zwiftRiderId,
				pointsGeneral: rider.pointsGeneral,
				name: resultsSeries.find(elm => elm.zwiftRiderId === rider.zwiftRiderId).name,
				category: resultsSeries.find(elm => elm.zwiftRiderId === rider.zwiftRiderId)
					.categoryCurrent,
				team: resultsSeries.find(elm => elm.zwiftRiderId === rider.zwiftRiderId).team ?? '',
			};
		});
		console.log(resultsGeneral);
		const { name, type } = await Series.findOne({ _id: seriesId });

		resultsGeneral = resultsGeneral
			.filter(rider => rider.category === category)
			.sort((a, b) => b.pointsGeneral - a.pointsGeneral);
		resultsGeneral.forEach((rider, index) => {
			rider.place = index + 1;
		});

		const title = `${name}, ${type}, Генеральный зачет, Категория "${category}"`;

		const charts = divisionChart(resultsGeneral);

		for (let i = 0; i < charts.length; i++) {
			await ctx
				.replyWithHTML(`<pre>${title}\n${viewDesktop(charts[i])}</pre>`, clearCharts)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}

		return true;
	} catch (error) {
		console.log(error);
	}
}
