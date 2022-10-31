import { teamLeaveDB } from '../controllersDB/team-leave.js';
import { mainMenuKeyboard, mobVsDesKeyboard, resultSeriesKeyboard } from '../keyboard/keyboard.js';
import { beingDeveloped } from '../modules/beingDeveloped.js';
import { myResults } from '../view/myresults/myresults-view.js';

import { scheduleView } from '../view/schedule/schedule-view.js';
import { listRiders } from '../view/team/riders-view.js';

import { handlerResults } from './menu-results/handler-results.js';
import { handlerTeam } from './menu-team/handler-menu.js';
import { teamChooseForJoin } from './menu-team/helper.js';
import { handlerAdmin } from './menu_admin/handler-menu.js';
import { account, getSchedule } from './helper-main.js';
import { getScheduleWeekly } from '../modules/schedule-weekle.js';
import { resultsSeriesTeams } from '../view/result-teams/teams.js';
import { seriesBtn } from '../keyboard/button/schedule-btn.js';
import { resultGeneral } from './menu-results/helper.js';
import { resultsSeriesGeneral } from '../view/series_general/series-general.js';

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
		// console.log(cbqData); //❗❗❗

		// первый уровень меню
		if (cbqData === 'main')
			return await ctx.editMessageText(
				`❗<b>Главное меню. Выбор основных функций.</b>❗`,
				await mainMenuKeyboard(ctx)
			);

		if (cbqData.includes('m_1_all_3_E__')) return await resultsSeriesTeams(ctx, cbqData);
		if (cbqData.includes('m_3_2_E__')) return await listRiders(ctx, cbqData);
		if (cbqData.includes('m_3_2_4_1_E--teamLeave_')) return await teamLeaveDB(ctx, cbqData);
		if (cbqData.includes('m_3_2_2_all_E__teamJoin_')) return await teamChooseForJoin(ctx, cbqData);
		// ловим V-- для выбора устройства
		if (cbqData.includes('V--')) {
			return await ctx.editMessageText(
				'<b>👨‍💻 Выбор используемого устройства.</b>',
				mobVsDesKeyboard(cbqData)
			);
		}
		if (cbqData === 'm_1_')
			return ctx.editMessageText(
				'<b>🏆 Результаты заездов серий. Выбор серии.</b>',
				await seriesBtn()
			);

		if (cbqData.includes('m_1_all__')) {
			return await ctx.editMessageText(
				'<b>🏆 Результаты заездов.\nВыбор зачетов. Выбор результатов отдельных этапов.</b>',
				await resultSeriesKeyboard(cbqData)
			);
		}
		if (cbqData.includes('m_1_all_2__')) return await resultGeneral(ctx, cbqData);
		if (cbqData.includes('m_1_all_2_all_')) return await resultsSeriesGeneral(ctx, cbqData);

		//меню "Команда"
		if (cbqData.includes('m_3_2')) return await handlerTeam(ctx, cbqData);
		// меню "Админ кабинет"
		if (cbqData.includes('m_4_')) return await handlerAdmin(ctx, cbqData);

		// ===========================================================================
		// первый уровень меню
		if (cbqData === 'account_registration') return await ctx.scene.enter('firstSceneReg');

		// Обработчик ветки меню Результаты
		const isCompleted = await handlerResults(ctx, cbqData);
		if (isCompleted) return;

		//расписание заездов
		if (cbqData === 'm_2_') return await getSchedule(ctx);
		if (cbqData.includes('m_2_all__')) return await scheduleView(ctx, cbqData);
		if (cbqData === 'm_2_V') return await getScheduleWeekly(ctx);

		if (cbqData === 'm_3_') return await account(ctx);
		if (cbqData === 'm_3_1_E') return await myResults(ctx, cbqData);

		// обработка запросов из админ кабинета
		if (cbqData === 'admin_getProtocol') return await ctx.scene.enter('getProtocol');
		if (cbqData === 'admin_getSchedule') return await ctx.scene.enter('downloadSchedule');
		// отриcовка таблиц
		// расписание

		if (cbqData === 'clear') return;
		await beingDeveloped(ctx);
	} catch (error) {
		console.log(error);
	}
}
