import {
	adminCategoriesKeyboard,
	adminKeyboard,
	adminTeamKeyboard,
} from '../../keyboard/keyboard.js';
import {
	approvalTeam,
	assignCategoryRiderFromStage,
	assignCatRider,
	categoryRiderFromStage,
	pointsSeries,
	requestTeam,
	riderCategory,
	updatePointsSeries,
} from './helper.js';

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

		if (cbqData === 'm_4_1_1_E') return await requestTeam(ctx);
		if (cbqData === 'm_4_4_1_') return await ctx.scene.enter('categoryRider');
		if (cbqData.includes('m_4_4_1_E')) return await assignCatRider(ctx, cbqData);
		if (cbqData === 'm_4_4_2_') return await categoryRiderFromStage(ctx);
		if (cbqData.includes('m_4_4_2_E')) return await assignCategoryRiderFromStage(ctx, cbqData);
		if (cbqData.includes('m_4_team_add_')) return await approvalTeam(ctx, cbqData);
		if (cbqData === 'm_4_5_') return await pointsSeries(ctx);
		if (cbqData.includes('m_4_5_E__')) return await updatePointsSeries(ctx, cbqData);
	} catch (error) {
		console.log(error);
	}
}
