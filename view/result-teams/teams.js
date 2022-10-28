import { mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { resultTeamDes } from './desktop.js';
import { resultTeamMob } from './mobile.js';

export async function resultsSeriesTeams(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const seriesId = cbqData.slice(17);

		const seriesDB = await Series.findOne({ _id: seriesId });
		//пока для одного стейджа расчет
		const stageDB = await Stage.find({ seriesId, hasResults: true });

		let resultsSeries = [];
		for (let i = 0; i < stageDB.length; i++) {
			let resultsDB = await Result.find({
				stageId: stageDB[i]._id,
				riderId: { $ne: undefined },
			}).populate({
				path: 'riderId',
				select: 'category',
			});
			resultsSeries = [...resultsSeries, ...resultsDB];
		}

		//уникальные имена команд
		let uniqueName = new Set();
		resultsSeries.forEach(result => {
			if (result.teamCurrent) uniqueName.add(result.teamCurrent);
		});

		let results = [];
		//заготовка массива для подсчета очков командам по категориям
		const categories = ['A', 'B', 'C'];
		uniqueName.forEach(team => {
			categories.forEach(category => {
				results.push({ name: team, category, points: 0 });
			});
		});

		results.forEach(teamWithCat => {
			resultsSeries.forEach(result => {
				if (
					teamWithCat.name === result.teamCurrent &&
					teamWithCat.category === result.riderId?.category
				) {
					teamWithCat.points = teamWithCat.points + result.pointsStage;
				}
			});
		});
		console.log(results);

		// await ctx.editMessageText(
		// 	`❗<b>Главное меню. Выбор основных функций.</b>❗`,
		// 	await mainMenuKeyboard(ctx)
		// );

		if (view === 'Des') return resultTeamDes(ctx, results, seriesDB.name);
		if (view === 'Mob') return resultTeamMob(ctx, results, seriesDB.name);
	} catch (error) {
		console.log(error);
	}
}
