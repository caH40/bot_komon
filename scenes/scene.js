import { Scenes } from 'telegraf';

const { leave } = Scenes.Stage;

//this scene edits the bot data
export const getXlsx = () => {
	try {
		const xlsxScene = new Scenes.xlsxScene('getXlsx');
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
