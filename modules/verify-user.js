import { Rights } from '../Model/Rights.js';

export async function verifyRoot(ctx) {
	try {
		const userId = ctx.update.callback_query.message.chat.id;
		const response = await Rights.findOne({ root: { $in: userId } });
		if (response) return true;
		return false;
	} catch (error) {
		console.log(error);
	}
}
export async function verifyAdmin(ctx) {
	try {
		const userId = ctx.update.callback_query.message.chat.id;
		const response = await Rights.findOne({ admin: { $in: userId } });
		if (response) return true;
		return false;
	} catch (error) {
		console.log(error);
	}
}
