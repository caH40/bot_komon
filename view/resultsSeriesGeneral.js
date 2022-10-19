import { clearCharts } from '../keyboard/keyboard.js';
import { Result } from '../Model/Result.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';
import { divisionChart } from '../utility/chart-division.js';
import { secondesToTime } from '../utility/date-convert.js';
import { viewDesktop } from './generate/general.js';

export async function resultsSeriesGeneral(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(17);
		const category = cbqData.slice(15, 16);

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

		const title = `${name}, ${type}, Генеральный зачет, Категория "${category}"`;

		const charts = divisionChart(resultsGeneral);
		// console.log(charts);

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
