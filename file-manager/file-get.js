import { downloadXlsx } from './axios/download.js';

export async function getFileTelegram(ctx, dlPath) {
	try {
		const fileId = ctx.message.document.file_id;
		const fileName = ctx.message.document.file_name;
		ctx.session.data.fileName = fileName;

		const mimeType = ctx.message.document.mime_type;
		const mimeTypeSample = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		if (mimeType === mimeTypeSample) {
		} else {
			ctx.reply('Файл должен быть файлом Excel и иметь расширение - xlsx\nПопробуйте еще раз.');
			return false;
		}
		const resGetFile = await ctx.telegram.getFile(fileId);
		const filePath = resGetFile.file_path;

		const isExistsFile = await downloadXlsx(fileName, filePath, dlPath);

		if (isExistsFile) {
			ctx.reply('Файл с таким именем уже существует\nПопробуйте еще раз.');
			return false;
		}
		await ctx.reply('Файл загружен');
		return true;
	} catch (error) {
		console.log(error);
	}
}
