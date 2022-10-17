import { Scenes } from 'telegraf';
import { deleteFile } from '../file-manager/file-delete.js';
import { getFileTelegram } from '../file-manager/file-get.js';
import { getExcel } from '../file-manager/xlsx/excel.js';
import { text } from '../modules/text.js';
import { divisionChart, viewDesktop } from '../utility/viewer.js';

const { leave } = Scenes.Stage;

export const downloadProtocolBase = () => {
	try {
		const protocol = new Scenes.BaseScene('getProtocol');
		protocol.enter(async ctx => {
			ctx.session.data = {};
			await ctx.reply(text.enter);
		});

		protocol.on('document', async ctx => {
			const isRight = await getFileTelegram(ctx);
			if (isRight) await ctx.scene.enter('uploadProtocol');
			// if (isRight) ctx.scene.leave('getProtocol');
		});

		protocol.command('quit', leave('getProtocol'));

		protocol.on('text', async ctx => await ctx.reply(text.wrong));

		return protocol;
	} catch (error) {
		console.log(error);
	}
};

// проверка данных из файла xlsx и загрузка в базу данных
export const uploadProtocolBase = () => {
	try {
		const protocol = new Scenes.BaseScene('uploadProtocol');
		protocol.enter(async ctx => {
			const fileName = ctx.session.data.fileName;
			await ctx.reply('Данные обрабатываются...');
			// const dataXlsx = await getExcel('Autumn-2022_Stage-3.xlsx');
			const dataXlsx = await getExcel(ctx, fileName);
			if (!dataXlsx) {
				await ctx.reply('Произошла ошибка при загрузке данных из excel файла...');
				deleteFile(fileName);
				await ctx.reply(`Файл ${fileName} удален!`);
				return await ctx.scene.enter('getProtocol');
			}

			const charts = divisionChart(dataXlsx);

			for (let i = 0; i < charts.length; i++) {
				await ctx.replyWithHTML('<pre>' + viewDesktop(charts[i]) + '</pre>');
			}
		});

		protocol.command('quit', leave('uploadProtocol'));
		protocol.on('text', async ctx => await ctx.reply(text.wrong));

		return protocol;
	} catch (error) {
		console.log(error);
	}
};
