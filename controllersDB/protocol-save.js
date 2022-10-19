import { Result } from '../Model/Result.js';
import { Stage } from '../Model/Stage.js';
import { convertTime } from '../utility/date-convert.js';

export async function protocolToDB(dataResult, seriesId, stageId) {
	try {
		//riderId ,берется после идентификации райдера в протоколе
		const length = dataResult.length;
		for (let index = 0; index < length; index++) {
			let result = new Result({
				stageId,
				name: dataResult[index].name,
				placeAbsolute: dataResult[index].placeAbsolute,
				placeCategory: dataResult[index].placeCategory,
				watt: dataResult[index].watt,
				wattPerKg: dataResult[index].wattPerKg,
				time: convertTime(dataResult[index].time),
				gap: dataResult[index].gap,
				category: dataResult[index].category,
				categoryCurrent: dataResult[index].categoryCurrent,
				teamCurrent: dataResult[index].teamCurrent,
				pointsStage: dataResult[index].pointsStage,
			});

			const response = await result.save().catch(error => console.log(error));
			if (response) {
				await Stage.findOneAndUpdate({ _id: stageId }, { $set: { hasResults: true } });
			} else {
				console.log('Ошибка при сохранении данных результатов этапа!');
			}
		}
	} catch (error) {
		console.log(error);
	}
}
