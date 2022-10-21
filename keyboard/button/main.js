import { Markup } from 'telegraf';
import { verifyRoot, verifyAdmin } from '../../modules/verify-user.js';

export async function mainBtn(ctx) {
	try {
		const isAdmin = await verifyAdmin(ctx);
		const isRoot = await verifyRoot(ctx);
		return [
			[Markup.button.callback('Результаты заездов 🏆', 'main_series')],
			[Markup.button.callback('Расписание заездов 📅', 'main_schedule')],
			[Markup.button.callback('Личный кабинет 🔑', 'main_account')],
			isAdmin || isRoot ? [Markup.button.callback('Админ кабинет 🛠️', 'account_adminAcc')] : [],
		];
	} catch (error) {
		console.log(error);
	}
}
