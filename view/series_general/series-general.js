import { resultsSeriesGeneralDes } from './desktop.js';
import { resultsSeriesGeneralMob } from './mobile.js';

export async function resultsSeriesGeneral(ctx, cbqData) {
	try {
		const view = cbqData.slice(0, 3);
		const seriesId = cbqData.slice(21);
		const category = cbqData.slice(19, 20);

		if (view === 'Des') return resultsSeriesGeneralDes(ctx, category, seriesId);
		if (view === 'Mob') return resultsSeriesGeneralMob(ctx, category, seriesId);
	} catch (error) {
		console.log(error);
	}
}
