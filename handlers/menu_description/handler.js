import { descriptionKeyboard } from '../../keyboard/keyboard-desc.js';
import { beingDeveloped } from '../../modules/beingDeveloped.js';

export async function handlerDescription(ctx, cbqData) {
	try {
		if (cbqData === 'm_4_')
			return await ctx.editMessageText('<b>⚠️ Полезная информация!</b>', descriptionKeyboard());

		return await beingDeveloped(ctx);
	} catch (error) {
		console.log(error);
	}
}
