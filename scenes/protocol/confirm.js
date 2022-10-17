import { Scenes } from 'telegraf';

import { deleteFile } from '../../file-manager/file-delete.js';
import { text } from '../../modules/text.js';

export const confirmUploadProtocolScene = () => {
	const confirmScene = new Scenes.BaseScene('confirmUploadProtocol');
	confirmScene.enter(async ctx => await ctx.reply(text.confirm.enter));
	confirmScene.command('confirm', async ctx => {
		await ctx.reply(text.confirm.successfully);
		await ctx.scene.leave('confirmUploadProtocol');
	});
	confirmScene.command('quit', async ctx => {
		await ctx.reply(text.confirm.quit);
		deleteFile(ctx.session.data.fileName);
		await ctx.scene.leave('confirmUploadProtocol');
	});
	confirmScene.on('text', async ctx => await ctx.reply(text.confirm.wrong));
	return confirmScene;
};
