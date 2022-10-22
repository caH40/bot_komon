import { mainMenuKeyboard } from '../../keyboard/keyboard.js';

import { listRidersViewDes } from './desktop.js';
import { listRidersViewMob } from './mobile.js';

export async function listRiders(ctx, cbqData) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);
		console.log('В разработке!!!!!!!!!');
		const view = cbqData.slice(0, 3);

		// const title = `Список спортсменов команды "${name}"`;

		// if (view === 'Des') return listRidersViewDes(ctx, myResultsObj, title);
		// if (view === 'Mob') return listRidersViewMob(ctx, myResultsObj, title);
		return true;
	} catch (error) {
		console.log(error);
	}
}
