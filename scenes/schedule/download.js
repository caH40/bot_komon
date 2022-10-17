import { Scenes } from 'telegraf';
import { getFileTelegram } from '../../file-manager/file-get.js';
import { textSchedule } from '../../modules/text.js';

export const downloadScheduleBase = () => {
	try {
		const schedule = new Scenes.BaseScene('downloadSchedule');
		schedule.enter(async ctx => {
			ctx.session.data = {};
			await ctx.reply(textSchedule.download.enter);
		});

		schedule.on('document', async ctx => {
			//путь на сервере для хранения полученного файла
			const dlPath = 'src/schedule/';
			const isRight = await getFileTelegram(ctx, dlPath);
			if (isRight) await ctx.scene.enter('uploadSchedule');
		});

		schedule.command('quit', async ctx => await ctx.scene.leave('downloadSchedule'));
		schedule.on('text', async ctx => await ctx.reply(textSchedule.download.wrong));
		return schedule;
	} catch (error) {
		console.log(error);
	}
};
