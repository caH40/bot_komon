import { Markup } from 'telegraf';
import { verifyRoot, verifyAdmin } from '../../modules/verify-user.js';

export async function buttonCatRiders(ctx) {
	try {
		return [
			[Markup.button.callback('Результаты заездов 🏆', 'main_series')],
			[Markup.button.callback('Расписание заездов 📅', 'main_schedule')],
			[Markup.button.callback('Личный кабинет 🔑', 'main_account')],
			isAdmin || isRoot ? [Markup.button.callback('Админ кабинет 🛠️', 'm_4_')] : [],
		];
	} catch (error) {
		console.log(error);
	}
}
