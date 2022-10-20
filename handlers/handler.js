import { scheduleBtn } from '../keyboard/button/schedule-btn.js';
import { mainMenuKeyboard, accountAdminKeyboard, accountKeyboard } from '../keyboard/keyboard.js';
import { beingDeveloped } from '../modules/beingDeveloped.js';

import { scheduleView } from '../view/schedule-view.js';

import { handlerResults } from './menu-results/handler-results.js';

export async function handler(ctx, cbqData) {
	try {
		//исключение багов после перезапуска бота, при нажатии на старое меню
		if (!ctx.session.data) {
			ctx.session.data = {};
			ctx.session.data.messagesIdForDelete = [];
		}

		const messagesIdForDelete = ctx.session.data.messagesIdForDelete;
		const length = messagesIdForDelete.length;
		for (let index = 0; index < length; index++) {
			await ctx.deleteMessage(messagesIdForDelete[index]);
		}
		ctx.session.data.messagesIdForDelete = [];
		// console.log(cbqData); //❗
		// первый уровень меню
		if (cbqData === 'main')
			return await ctx.editMessageText(
				`❗<b>Главное меню. Выбор основных функций.</b>\n<i>main</i>`,
				mainMenuKeyboard
			);
		// первый уровень меню
		if (cbqData === 'account_registration') return await ctx.scene.enter('registration');

		// Обработчик ветки меню Результаты
		const isCompleted = await handlerResults(ctx, cbqData);
		if (isCompleted) return;

		if (cbqData === 'main_schedule')
			return await ctx.editMessageText(
				'<b>📅 Расписание серий и отдельных заездов.</b>\n<i>main/schedule</i>',
				await scheduleBtn()
			);
		if (cbqData === 'main_account')
			return await ctx.editMessageText(
				'<b>🔑 Личный кабинет.</b>\n<i>main/account</i>',
				await accountKeyboard(ctx)
			);
		if (cbqData === 'account_adminAcc')
			return await ctx.editMessageText(
				'<b>🛠️ Админ кабинет.</b>\n<i>main/account/admin</i>',
				accountAdminKeyboard
			);
		// третий уровень меню

		// четвертый уровень меню

		// обработка запросов из админ кабинета
		if (cbqData === 'admin_getProtocol') return await ctx.scene.enter('getProtocol');
		if (cbqData === 'admin_getSchedule') return await ctx.scene.enter('downloadSchedule');
		// отриcовка таблиц
		// расписание
		if (cbqData.includes('schedule_')) return await scheduleView(ctx, cbqData);
		if (cbqData === 'clear') return;
		await beingDeveloped(ctx);
	} catch (error) {
		console.log(error);
	}
}
