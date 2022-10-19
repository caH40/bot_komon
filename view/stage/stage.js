import { resultsViewStageDes } from './desktop.js';
import { resultsViewStageMob } from './mobile.js';

export async function resultsViewStage(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const category = cbqData.slice(17, 18);
		const stageId = cbqData.slice(19);

		if (view === 'Des') return resultsViewStageDes(ctx, category, stageId);
		if (view === 'Mob') return resultsViewStageMob(ctx, category, stageId);
	} catch (error) {
		console.log(error);
	}
}
