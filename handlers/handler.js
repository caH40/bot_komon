import { mainMenu } from '../controllers/main.js';
import {
	account,
	mainMenuKey,
	series,
	schedule,
	resultSeries,
	resultStages,
} from '../keyboard/keyboard.js';

export async function handler(ctx, cbqData) {
	try {
		console.log(cbqData);
		// первый уровень меню
		if (cbqData === 'main') await ctx.editMessageText(`Главное меню`, mainMenuKey);
		// второй уровень меню
		if (cbqData === 'main_series') await ctx.editMessageText('Результаты заездов', series);
		if (cbqData === 'main_schedule') await ctx.editMessageText('Расписание заездов', schedule);
		if (cbqData === 'main_account') await ctx.editMessageText('Личный кабинет', account);
		// третий уровень меню
		if (cbqData === 'series_autumn2022')
			await ctx.editMessageText('Личный кабинет', resultSeries('autumn2022'));
		// четвертый уровень меню
		if (cbqData.includes('result_Stages_'))
			await ctx.editMessageText('Результаты этапов' + 'autumn2022', resultStages('autumn2022'));
		// вывод результатов уровень меню
	} catch (error) {
		console.log(error);
	}
}
