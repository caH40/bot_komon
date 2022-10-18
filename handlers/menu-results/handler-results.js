import { resultSeriesBtn, seriesBtn } from '../../keyboard/button/schedule-btn.js';
import { resultsView } from '../../view/results-view.js';
import { resultStage, resultStages } from './helper.js';

export async function handlerResults(ctx, cbqData) {
	try {
		console.log('tut');
		if (
			!(
				cbqData === 'main_series' ||
				cbqData.includes('series_') ||
				cbqData.includes('result_') ||
				cbqData.includes('stage_')
			)
		)
			return;
		if (cbqData === 'main_series')
			return ctx.editMessageText('Результаты заездов. Выберите Series.', await seriesBtn());

		if (cbqData.includes('series_')) {
			return await ctx.editMessageText('Личный кабинет', await resultSeriesBtn(cbqData));
		}
		// четвертый уровень меню
		if (cbqData.includes('result_Stages_')) return await resultStages(ctx, cbqData);

		if (cbqData.includes('stage_')) return await resultStage(ctx, cbqData);

		// отриcовка таблиц
		// результаты
		if (cbqData.includes('result_')) return await resultsView(ctx, cbqData);
		// if (cbqData.includes('stage_')) return await resultsViewStage(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
