import { teamJoin, teamLeave, teamMain } from './helper.js';

export async function handlerTeam(ctx, cbqData) {
	try {
		if (!cbqData.includes('m_3_2_')) return;

		if (cbqData === 'm_3_2_') return await teamMain(ctx);
		if (cbqData === 'm_3_2_2_') return await teamJoin(ctx);
		if (cbqData === 'm_3_2_3_S__create') return await ctx.scene.enter('firstSceneCreateTeam');
		if (cbqData === 'm_3_2_4_') return await teamLeave(ctx);
	} catch (error) {
		console.log(error);
	}
}
