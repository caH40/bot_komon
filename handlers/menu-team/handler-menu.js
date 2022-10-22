import { mobVsDesKeyboard } from '../../keyboard/keyboard.js';
import { teamJoin, teamMain } from './helper.js';

export async function handlerTeam(ctx, cbqData) {
	try {
		if (!cbqData.includes('m_3_2_')) return;

		if (cbqData === 'm_3_2_') return await teamMain(ctx);
		if (cbqData === 'm_3_2_2_') return await teamJoin(ctx);
	} catch (error) {
		console.log(error);
	}
}
