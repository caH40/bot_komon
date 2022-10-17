import { scheduleBtn } from '../keyboard/button/schedule-btn.js';
import {
	accountKeyboard,
	mainMenuKeyboard,
	seriesKeyboard,
	resultSeriesKeyboard,
	resultStagesKeyboard,
	accountAdminKeyboard,
} from '../keyboard/keyboard.js';
import { beingDeveloped } from '../modules/beingDeveloped.js';
import { scheduleView } from '../view/schedule-view.js';

export async function handler(ctx, cbqData) {
	try {
		console.log(cbqData);
		// первый уровень меню
		if (cbqData === 'main') return await ctx.editMessageText(`Главное меню`, mainMenuKeyboard);
		// второй уровень меню
		if (cbqData === 'main_series')
			return await ctx.editMessageText('Результаты заездов', seriesKeyboard);
		if (cbqData === 'main_schedule')
			return await ctx.editMessageText('Расписание заездов', await scheduleBtn());
		if (cbqData === 'main_account')
			return await ctx.editMessageText('Личный кабинет', accountKeyboard);
		if (cbqData === 'account_adminAcc')
			return await ctx.editMessageText('Админ кабинет', accountAdminKeyboard);
		// третий уровень меню
		if (cbqData === 'series_autumn2022')
			return await ctx.editMessageText('Личный кабинет', resultSeriesKeyboard('autumn2022'));
		// четвертый уровень меню
		if (cbqData.includes('result_Stages_'))
			return await ctx.editMessageText(
				'Результаты этапов' + 'autumn2022',
				resultStagesKeyboard('autumn2022')
			);
		// обработка запросов из админ кабинета
		if (cbqData === 'admin_getProtocol') return await ctx.scene.enter('getProtocol');
		if (cbqData === 'admin_getSchedule') return await ctx.scene.enter('downloadSchedule');
		// отриcовка таблиц
		if (cbqData.includes('schedule_')) return await scheduleView(ctx, cbqData);
		await beingDeveloped(ctx);
	} catch (error) {
		console.log(error);
	}
}
