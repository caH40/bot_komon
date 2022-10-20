import { resultsViewStageDes } from './desktop.js';
import { resultsViewStageMob } from './mobile.js';
import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { divisionChart } from '../../utility/chart-division.js';
import { secondesToTime } from '../../utility/date-convert.js';
import { mainMenuKeyboard } from '../../keyboard/keyboard.js';
import { gapValue, maxValue } from './utilites.js';

export async function resultsViewStage(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const category = cbqData.slice(17, 18);
		const stageId = cbqData.slice(19);

		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			mainMenuKeyboard
		);
		const stagesDB = await Stage.find({ _id: stageId });
		const seriesId = stagesDB[0].seriesId;
		const seriesNumber = stagesDB[0].number;
		const seriesType = stagesDB[0].type;
		const { name } = await Series.findOne({ _id: seriesId });

		let resultsDB = [];
		// 'T' общий протокол
		if (category === 'T') {
			resultsDB = await Result.find({ stageId });
		} else {
			resultsDB = await Result.find({ stageId, category });
		}

		resultsDB = resultsDB.sort((a, b) => a.time - b.time);
		resultsDB = resultsDB.map(elm => elm.toObject());

		resultsDB = await gapValue(resultsDB);
		resultsDB = await maxValue(resultsDB);

		resultsDB.forEach(elm => {
			elm.gap = secondesToTime(elm.gap);
			elm.time = secondesToTime(elm.time);
			elm.gapPrev = secondesToTime(elm.gapPrev);
		});

		const title = `${name}, Этап ${seriesNumber}, ${seriesType}`;

		const charts = divisionChart(resultsDB);

		if (view === 'Des') return resultsViewStageDes(ctx, charts, title);
		if (view === 'Mob') return resultsViewStageMob(ctx, charts, title);
	} catch (error) {
		console.log(error);
	}
}
