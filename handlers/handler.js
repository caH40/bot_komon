import { resultSeriesBtn, scheduleBtn, seriesBtn } from '../keyboard/button/schedule-btn.js';
import { accountKeyboard, mainMenuKeyboard, accountAdminKeyboard } from '../keyboard/keyboard.js';

import { beingDeveloped } from '../modules/beingDeveloped.js';
import { resultsView } from '../view/results-view.js';
import { resultsViewStage } from '../view/resultsStage-view.js';
import { scheduleView } from '../view/schedule-view.js';
import { resultStages } from './handler-helper.js';

export async function handler(ctx, cbqData) {
	try {
		console.log(cbqData);
		// первый уровень меню
		if (cbqData === 'main') return await ctx.editMessageText(`Главное меню`, mainMenuKeyboard);
		// второй уровень меню
		if (cbqData === 'main_series')
			return await ctx.editMessageText('Результаты заездов', await seriesBtn());
		if (cbqData === 'main_schedule')
			return await ctx.editMessageText('Расписание заездов', await scheduleBtn());
		if (cbqData === 'main_account')
			return await ctx.editMessageText('Личный кабинет', accountKeyboard);
		if (cbqData === 'account_adminAcc')
			return await ctx.editMessageText('Админ кабинет', accountAdminKeyboard);
		// третий уровень меню

		if (cbqData.includes('series_'))
			return await ctx.editMessageText('Личный кабинет', await resultSeriesBtn(cbqData));
		// четвертый уровень меню
		if (cbqData.includes('result_Stages_')) return await resultStages(ctx, cbqData);

		// обработка запросов из админ кабинета
		if (cbqData === 'admin_getProtocol') return await ctx.scene.enter('getProtocol');
		if (cbqData === 'admin_getSchedule') return await ctx.scene.enter('downloadSchedule');
		// отриcовка таблиц
		// результаты
		if (cbqData.includes('result_')) return await resultsView(ctx, cbqData);
		if (cbqData.includes('stage_')) return await resultsViewStage(ctx, cbqData);
		// расписание
		if (cbqData.includes('schedule_')) return await scheduleView(ctx, cbqData);
		await beingDeveloped(ctx);
	} catch (error) {
		console.log(error);
	}
}
