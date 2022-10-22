import { adminKeyboard, adminTeamKeyboard } from '../../keyboard/keyboard.js';
import { approvalTeam, requestTeam } from './helper.js';

export async function handlerAdmin(ctx, cbqData) {
	try {
		if (cbqData === 'm_4_')
			return await ctx.editMessageText('<b>🛠️ Админ кабинет.</b>', adminKeyboard);
		if (cbqData === 'm_4_1_')
			return await ctx.editMessageText('<b>🛠️ Управление командами</b>', adminTeamKeyboard);
		if (cbqData === 'm_4_1_1_') return await requestTeam(ctx);
		if (cbqData.includes('m_4_team_add_')) return await approvalTeam(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
