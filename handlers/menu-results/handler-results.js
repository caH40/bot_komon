import { resultSeriesBtn, seriesBtn } from '../../keyboard/button/schedule-btn.js';
import { mobVsDesKeyboard } from '../../keyboard/keyboard.js';
import { beingDeveloped } from '../../modules/beingDeveloped.js';
import { resultsView } from '../../view/results-view.js';
import { resultsSeriesGeneral } from '../../view/series_general/series-general.js';
import { resultsViewStage } from '../../view/stage/stage.js';
import { resultGeneral, resultStage, resultStages } from './helper.js';

export async function handlerResults(ctx, cbqData) {
	try {
		if (
			!(
				cbqData === 'main_series' ||
				cbqData.includes('series_') ||
				cbqData.includes('result_') ||
				cbqData.includes('view_') ||
				cbqData.includes('stage_')
			)
		)
			return;

		if (cbqData.includes('view_')) {
			const queryData = cbqData.slice(5);
			return await ctx.editMessageText(
				'Выбор используемого устройства для корректного отображения таблиц.',
				mobVsDesKeyboard(queryData)
			);
		}

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

		// результаты

		//необходимо искать сначала более длинный составной ключ
		if (cbqData.includes('result_General_')) return await resultGeneral(ctx, cbqData);
		// отриcовка таблиц
		if (cbqData.includes('result_GSeries_')) return await resultsSeriesGeneral(ctx, cbqData);

		if (cbqData.includes('result_Team_')) return await beingDeveloped(ctx);
		if (cbqData.includes('result_Stage_')) return await resultsViewStage(ctx, cbqData);
		if (cbqData.includes('result_')) return await resultsView(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
