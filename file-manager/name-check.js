import { Series } from '../Model/Series.js';
import { Stage } from '../Model/Stage.js';

export async function checkFileName(ctx, fileName) {
	try {
		//проверка на наличие в БД серии и стейджа который указан в наименовании файла
		const seriesNames = fileName.slice(0, -5).split('_Stage-');

		const seriesDB = await Series.findOne({ name: seriesNames[0] });
		if (!seriesDB) {
			ctx.reply(
				`В БД не найдена Серия с наименованием ${seriesNames[0]}. Наименование файла должно быть вида "Название серии год_Stage-номер этапа.xlsx".\nПример "Autumn 2022_Stage-1.xlsx"\nПопробуйте еще раз.\nДля выхода наберите /quit`
			);
			return false;
		}
		const stageDB = await Stage.findOne({ seriesId: seriesDB._id, number: +seriesNames[1] });
		if (!stageDB) {
			ctx.reply(
				`В БД не найден Этап-${seriesNames[1]} Серии "${seriesNames[0]}". Наименование файла должно быть вида "Название серии год_Stage-номер этапа.xlsx".\nПример "Autumn 2022_Stage-1.xlsx"\nПопробуйте еще раз.\nДля выхода наберите /quit`
			);
			return false;
		}
		ctx.session.data.seriesId = seriesDB._id;
		ctx.session.data.stageId = stageDB._id;
		return true;
	} catch (error) {
		console.log(error);
	}
}
