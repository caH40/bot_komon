import { Scenes } from 'telegraf';
import { deleteFile } from '../../file-manager/file-delete.js';
import { getExcel } from '../../file-manager/xlsx/protocol.js';
import { text } from '../../modules/text.js';
import { divisionChart, viewDesktop } from '../../view/protocol.js';

const { leave } = Scenes.Stage;

// проверка данных из файла xlsx и загрузка в базу данных
export const uploadProtocolBase = () => {
	try {
		const protocol = new Scenes.BaseScene('uploadProtocol');
		protocol.enter(async ctx => await enter(ctx));
		protocol.command('quit', leave('uploadProtocol'));
		protocol.on('text', async ctx => await ctx.reply(text.wrong));

		return protocol;
	} catch (error) {
		console.log(error);
	}
};

async function enter(ctx) {
	const fileName = ctx.session.data.fileName;
	await ctx.reply(text.upload.enter);
	const dataXlsx = await getExcel(ctx, fileName);
	if (!dataXlsx) {
		await ctx.reply(text.upload.wrong);
		deleteFile(fileName, ctx.session.data.dlPath);
		await ctx.reply(`Файл ${fileName} удален!`);
		return await ctx.scene.enter('getProtocol');
	}

	const charts = divisionChart(dataXlsx);

	for (let i = 0; i < charts.length; i++) {
		await ctx.replyWithHTML('<pre>' + viewDesktop(charts[i]) + '</pre>');
	}
	ctx.scene.enter('confirmUploadProtocol');
}
