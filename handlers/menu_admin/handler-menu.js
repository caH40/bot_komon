import {
	adminCategoriesKeyboard,
	adminKeyboard,
	adminTeamKeyboard,
} from '../../keyboard/keyboard.js';
import { approvalTeam, requestTeam, riderCategory } from './helper.js';

export async function handlerAdmin(ctx, cbqData) {
	try {
		if (cbqData === 'm_4_')
			return await ctx.editMessageText('<b>🛠️ Админ кабинет.</b>', adminKeyboard);
		if (cbqData === 'm_4_1_')
			return await ctx.editMessageText('<b>🛠️ Управление командами</b>', adminTeamKeyboard);
		if (cbqData === 'm_4_4_')
			return await ctx.editMessageText(
				'<b>🛠️ Установка категорий райдерам</b>',
				adminCategoriesKeyboard
			);
		if (cbqData === 'm_4_4_1_') return await ctx.scene.enter('categoryRider');
		if (cbqData === 'm_4_1_1_E') return await requestTeam(ctx);
		if (cbqData.includes('m_4_team_add_')) return await approvalTeam(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
