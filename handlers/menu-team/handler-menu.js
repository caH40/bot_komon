import { teamAddRiderDB } from '../../controllersDB/team-add-rider.js';
import { teamRemoveRiderDB } from '../../controllersDB/team-del-rider.js';
import {
	teamAddRider,
	teamCreate,
	teamJoin,
	teamLeave,
	teamMain,
	teamManagement,
	teamRemove,
	teamRemoveRider,
} from './helper.js';

export async function handlerTeam(ctx, cbqData) {
	try {
		if (!cbqData.includes('m_3_2_')) return;

		if (cbqData === 'm_3_2_') return await teamMain(ctx);
		if (cbqData === 'm_3_2_2_') return await teamJoin(ctx);
		if (cbqData === 'm_3_2_3_S__create') return await teamCreate(ctx);
		if (cbqData === 'm_3_2_4_') return await teamLeave(ctx);
		if (cbqData === 'm_3_2_5_') return await teamManagement(ctx);
		if (cbqData === 'm_3_2_5_1_') return await teamAddRider(ctx);
		if (cbqData === 'm_3_2_5_2_') return await teamRemoveRider(ctx);
		if (cbqData.includes('m_3_2_5_1_E_')) return await teamAddRiderDB(ctx, cbqData);
		if (cbqData.includes('m_3_2_5_2_E_')) return await teamRemoveRiderDB(ctx, cbqData);
		if (cbqData === 'm_3_2_5_4_E') return await teamRemove(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
