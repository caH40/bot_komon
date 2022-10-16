import { mainMenu } from '../controllers/main.js';
import {
	accountKeyboard,
	mainMenuKeyboard,
	seriesKeyboard,
	scheduleKeyboard,
	resultSeriesKeyboard,
	resultStagesKeyboard,
	accountAdminKeyboard,
} from '../keyboard/keyboard.js';

export async function handler(ctx, cbqData) {
	try {
		console.log(cbqData);
		// первый уровень меню
		if (cbqData === 'main') await ctx.editMessageText(`Главное меню`, mainMenuKeyboard);
		// второй уровень меню
		if (cbqData === 'main_series') await ctx.editMessageText('Результаты заездов', seriesKeyboard);
		if (cbqData === 'main_schedule')
			await ctx.editMessageText('Расписание заездов', scheduleKeyboard);
		if (cbqData === 'main_account') await ctx.editMessageText('Личный кабинет', accountKeyboard);
		if (cbqData === 'account_adminAcc')
			await ctx.editMessageText('Админ кабинет', accountAdminKeyboard);
		// третий уровень меню
		if (cbqData === 'series_autumn2022')
			await ctx.editMessageText('Личный кабинет', resultSeriesKeyboard('autumn2022'));
		// четвертый уровень меню
		if (cbqData.includes('result_Stages_'))
			await ctx.editMessageText(
				'Результаты этапов' + 'autumn2022',
				resultStagesKeyboard('autumn2022')
			);
		// вывод результатов уровень меню
	} catch (error) {
		console.log(error);
	}
}
