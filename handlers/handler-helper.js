import { resultStagesKeyboard } from '../keyboard/keyboard.js';
import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';

export async function resultStages(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(14);
		const { name } = await Series.findOne({ _id: seriesId });
		const stagesDB = await Stage.find({ seriesId, hasResults: true });

		await ctx.editMessageText(`Результаты этапов ${name}`, resultStagesKeyboard(stagesDB));
	} catch (error) {
		console.log(error);
	}
}
