import { Scenes } from 'telegraf';

const { leave } = Scenes.Stage;

//this scene edits the bot data
export const sampleBase = () => {
	try {
		const baseScene = new Scenes.BaseScene('sampleBase');
		baseScene.enter(async ctx => await ctx.reply('Вы вошли в сцену'));
		baseScene.leave(async ctx => await ctx.reply('До свидания!'));
		baseScene.command('quit', leave('sampleBase'));
		baseScene.on('text', async ctx => {
			console.log(ctx.message.text);
			await ctx.reply('Это эхо - ' + ctx.message.text);
			await ctx.reply('Для выхода введите команду /quit');
		});
		return baseScene;
	} catch (error) {
		console.log(error);
	}
};
