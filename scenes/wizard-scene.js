import { Scenes } from 'telegraf';

export const getProtocolWizard = () => {
	try {
		return new Scenes.WizardScene(
			'getProtocol',
			async ctx => {
				await ctx.reply(
					`Загрузите протокол заезда. Название файла должно быть вида "Название серии-год_этап-номер.xlsx"`
				);
				ctx.wizard.state.fileProtocol = {};
				return ctx.wizard.next();
			},
			async ctx => {
				bot.on('document', async ctx => {
					const fileId = ctx.message.document.file_id;
					console.log('fileId', fileId);
					const resGetFile = await ctx.telegram.getFile(fileId);
					console.log('resGetFile', resGetFile);
					// ctx.wizard.state.fileProtocol.filePath = response.file_path;
					// const resDownloadXlsx = await downloadXlsx(response.file_path, name);
				});
				return ctx.wizard.next();
			},
			async ctx => {
				// ctx.wizard.state.person.age = ctx.message.text;
				// const name = ctx.wizard.state.person.name;
				// const age = ctx.wizard.state.person.age;
				// await ctx.reply(`Привет ${name} с возрастом ${age}`);
				await ctx.reply(`Выход из сцены`);
				return ctx.scene.leave();
			}
		);
	} catch (error) {
		console.log(error);
	}
};
