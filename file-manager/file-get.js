export async function getFileTelegram(ctx) {
	try {
		const fileId = ctx.message.document.file_id;
		const fileName = ctx.message.document.file_name;
		const mimeType = ctx.message.document.mime_type;
		const mimeTypeSample = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		if (mimeType === mimeTypeSample) {
		} else {
			ctx.reply('Файл должен быть файлом Excel и иметь расширение - xlsx\nПопробуйте еще раз.');
		}
		const resGetFile = await ctx.telegram.getFile(fileId);
		const filePath = resGetFile.file_path;
		console.log('resGetFile', resGetFile);

		// const resDownloadXlsx = await downloadXlsx(response.file_path, name);
	} catch (error) {
		console.log(error);
	}
}
