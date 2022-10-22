import { teamLeaveDB } from '../controllersDB/team-leave.js';
import { scheduleBtn } from '../keyboard/button/schedule-btn.js';
import {
	mainMenuKeyboard,
	adminKeyboard,
	accountKeyboard,
	mobVsDesKeyboard,
} from '../keyboard/keyboard.js';
import { beingDeveloped } from '../modules/beingDeveloped.js';
import { myResults } from '../view/myresults/myresults-view.js';

import { scheduleView } from '../view/schedule/schedule-view.js';
import { listRiders } from '../view/team/riders-view.js';

import { handlerResults } from './menu-results/handler-results.js';
import { handlerTeam } from './menu-team/handler-menu.js';
import { teamChooseForJoin } from './menu-team/helper.js';

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
		console.log(cbqData); //❗❗❗
		// первый уровень меню
		if (cbqData === 'main')
			return await ctx.editMessageText(
				`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
				await mainMenuKeyboard(ctx)
			);

		if (cbqData.includes('_m_3_1_V--myResults')) return await myResults(ctx, cbqData);
		if (cbqData.includes('_m_3_2_V--listRiders')) return await listRiders(ctx, cbqData);
		if (cbqData.includes('m_3_2_4_1_E--teamLeave_')) return await teamLeaveDB(ctx, cbqData);
		if (cbqData.includes('m_3_2_2_all_E__teamJoin_')) return await teamChooseForJoin(ctx, cbqData);
		// ловим V-- для выбора устройства
		if (cbqData.includes('V--')) {
			return await ctx.editMessageText(
				'<b>👨‍💻 Выбор используемого устройства.</b>',
				mobVsDesKeyboard(cbqData)
			);
		}
		//меню "Команда"
		if (cbqData.includes('m_3_2')) return await handlerTeam(ctx, cbqData);
		// меню "Админ кабинет"
		if (cbqData === 'm_4_')
			return await ctx.editMessageText(
				'<b>🛠️ Админ кабинет.</b>\n<i>main/account/admin</i>',
				adminKeyboard
			);

		// ===========================================================================
		// первый уровень меню
		if (cbqData === 'account_registration') return await ctx.scene.enter('firstSceneReg');

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
				accountKeyboard
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
