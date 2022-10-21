import { clearCharts, mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { divisionChart } from '../../utility/chart-division.js';
import { viewMobile } from '../generate/general.js';

export async function resultsSeriesGeneralMob(ctx, category, seriesId) {
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
		let set = new Set();
		let points = 0;
		resultsSeries.forEach(elm => set.add(elm.name));

		let resultsGeneral = [];
		set.forEach(name => {
			points = 0;
			resultsSeries.forEach(elm => {
				if (name === elm.name) points += elm.pointsStage;
			});
			resultsGeneral.push({ name, pointsGeneral: points });
		});
		//в будущем брать данные по группе и команде из коллекции Riders

		resultsGeneral = resultsGeneral.map(rider => {
			return {
				name: rider.name,
				pointsGeneral: rider.pointsGeneral,
				category: resultsSeries.find(elm => elm.name === rider.name).category,
				team: resultsSeries.find(elm => elm.name === rider.name).team ?? '',
			};
		});

		const { name, type } = await Series.findOne({ _id: seriesId });

		resultsGeneral = resultsGeneral
			.filter(rider => rider.category === category)
			.sort((a, b) => b.pointsGeneral - a.pointsGeneral);
		resultsGeneral.forEach((rider, index) => {
			rider.place = index + 1;
		});

		const title = `${name},Ген. зачет,"${category}"`;

		const charts = divisionChart(resultsGeneral);

		for (let i = 0; i < charts.length; i++) {
			await ctx
				.replyWithHTML(`<pre>${title}\n${viewMobile(charts[i])}</pre>`, clearCharts)
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		}

		return true;
	} catch (error) {
		console.log(error);
	}
}
