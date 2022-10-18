import { resultSeriesBtn, seriesBtn } from '../../keyboard/button/schedule-btn.js';
import { resultsView } from '../../view/results-view.js';
import { resultsViewStage } from '../../view/resultsStage-view.js';
import { resultStage, resultStages } from './helper.js';

export async function handlerResults(ctx, cbqData) {
	try {
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
			return ctx.editMessageText('Результаты заездов. Выбор серии заездов.', await seriesBtn());

		if (cbqData.includes('series_')) {
			return await ctx.editMessageText(
				'Результаты заездов. Выбор зачетов. Выбор результатов отдельных этапов. ',
				await resultSeriesBtn(cbqData)
			);
		}
		// четвертый уровень меню
		if (cbqData.includes('result_Stages_')) return await resultStages(ctx, cbqData);

		if (cbqData.includes('stage_')) return await resultStage(ctx, cbqData);

		// отриcовка таблиц
		// результаты

		//необходимо искать сначала более длинный составной ключ
		if (cbqData.includes('result_Stage_')) return await resultsViewStage(ctx, cbqData);
		if (cbqData.includes('result_')) return await resultsView(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
