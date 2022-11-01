import { beingDeveloped } from '../../modules/beingDeveloped.js';
import { posting } from './posting.js';

export async function resultsMountain(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(16);
		const category = cbqData.slice(14, 15);
		await beingDeveloped(ctx);
		return posting(ctx);
	} catch (error) {
		console.log(error);
	}
}
