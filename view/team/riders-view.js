import { mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';
import { Team } from '../../Model/Team.js';

import { listRidersViewDes } from './desktop.js';
import { listRidersViewMob } from './mobile.js';

export async function listRiders(ctx, cbqData) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗`,
			await mainMenuKeyboard(ctx)
		);

		const teamName = cbqData.slice(24);
		const teamDB = await Team.findOne({ name: teamName }).populate('riders.rider');

		const ridersDB = await Rider.find({ teamId: teamDB._id });
		let riders = ridersDB.map(rider => rider.toObject());

		for (let i = 0; i < riders.length; i++) {
			let resultsQuantity = await Result.find({ riderId: riders[i]._id }).length;
			riders[i].quantity = resultsQuantity ??= 0;
			riders[i].sequence = String(i + 1);

			if (riders[i]._id.toString() === teamDB.riders[0].rider.toString())
				riders[i].sequence = riders[i].sequence + 'C';
		}
		const view = cbqData.slice(0, 3);

		const title = `Райдеры команды "${teamName}"`;

		if (view === 'Des') return listRidersViewDes(ctx, riders, title);
		if (view === 'Mob') return listRidersViewMob(ctx, riders, title);
		return true;
	} catch (error) {
		console.log(error);
	}
}
