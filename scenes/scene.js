import { Scenes } from 'telegraf';
import { getFileTelegram } from '../file-manager/file-get.js';

const { leave } = Scenes.Stage;

//this scene edits the bot data
export const getXlsx = () => {
	try {
		const xlsxScene = new Scenes.BaseScene('getXlsx');
		xlsxScene.enter(async ctx => await ctx.reply('Загрузите файл .xlsx'));
		xlsxScene.leave(async ctx => await ctx.reply('До свидания!'));
		xlsxScene.command('quit', leave('getXlsx'));
		xlsxScene.on('text', async ctx => {
			console.log(ctx.message.text);
			await ctx.reply('Это эхо - ' + ctx.message.text);
			await ctx.reply('Для выхода введите команду /quit');
		});
		return xlsxScene;
	} catch (error) {
		console.log(error);
	}
};
export const getProtocolBase = () => {
	try {
		const protocol = new Scenes.BaseScene('getProtocol');
		protocol.enter(
			async ctx =>
				await ctx.reply(
					`Загрузите протокол заезда. Название файла должно быть вида "Название серии-год_этап-номер.xlsx"`
				)
		);
		protocol.leave(async ctx => await ctx.reply('До свидания!'));

		protocol.on('document', async ctx => await getFileTelegram(ctx));
		protocol.command('quit', leave());
		protocol.on(
			'text',
			async ctx => await ctx.reply(`Загрузите протокол. Для выхода наберите /quit`)
		);
		return protocol;
	} catch (error) {
		console.log(error);
	}
};
