import { Scenes } from 'telegraf';
import { getFileTelegram } from '../file-manager/file-get.js';
import { text } from '../modules/text.js';

const { leave } = Scenes.Stage;

export const getProtocolBase = () => {
	try {
		const protocol = new Scenes.BaseScene('getProtocol');
		protocol.enter(async ctx => await ctx.reply(text.enter));
		protocol.on('document', async ctx => {
			const isRight = await getFileTelegram(ctx);
			if (isRight) ctx.scene.leave('getProtocol');
		});
		protocol.command('quit', leave('getProtocol'));

		protocol.on('text', async ctx => await ctx.reply(text.wrong));
		return protocol;
	} catch (error) {
		console.log(error);
	}
};
