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

		const stageDB = await Stage.findOne({ seriesId });
		const resultsDB = await Result.find({ stageId: stageDB._id }).populate({
			path: 'riderId',
			select: 'category',
		});

		//уникальные имена команд
		let uniqueName = new Set();
		resultsDB.forEach(result => {
			if (result.teamCurrent) uniqueName.add(result.teamCurrent);
		});
		console.log(uniqueName);
		let results = [];
		const categories = ['A', 'B', 'C'];

		uniqueName.forEach(team => {
			categories.forEach(category => {
				results.push({ name: team, category, points: 0 });
			});
		});

		results.forEach(team => {
			resultsDB.forEach(result => {
				categories.forEach(category => {
					if (team.name === result.teamCurrent && result.riderId?.category === category) {
						team.points = team.points + result.pointsStage;
					}
				});
			});
		});

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
