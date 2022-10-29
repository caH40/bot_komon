import { mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { Team } from '../../Model/Team.js';
import { resultTeamDes } from './desktop.js';
import { resultTeamMob } from './mobile.js';

export async function resultsSeriesTeams(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const seriesId = cbqData.slice(17);

		const seriesDB = await Series.findOne({ _id: seriesId });
		//пока для одного стейджа расчет
		const stagesDB = await Stage.find({ seriesId, hasResults: true });

		let resultsSeries = [];
		for (let i = 0; i < stagesDB.length; i++) {
			let resultsDB = await Result.find({
				stageId: stagesDB[i]._id,
				riderId: { $ne: undefined },
			}).populate({
				path: 'riderId',
				select: 'category',
			});
			resultsSeries = [...resultsSeries, ...resultsDB];
		}

		let teamsDB = await Team.find();

		const teams = [];
		const categories = ['A', 'B', 'C'];
		teamsDB.forEach(team => {
			categories.forEach(category => teams.push({ name: team.name, category, points: 0 }));
		});

		teams.forEach(team => {
			resultsSeries.forEach(result => {
				if (team.name === result.teamCurrent && team.category === result.riderId?.category) {
					team.points = team.points + result.pointsStage;
				}
			});
		});
		// console.log(teams);

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
