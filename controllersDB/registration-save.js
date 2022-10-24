import { Result } from '../Model/Result.js';
import { Rider } from '../Model/Rider.js';

export async function registrationToDB(data) {
	try {
		const riderDB = await Rider.findOne({ telegramId: data.telegramId });
		if (riderDB)
			return await Rider.findOneAndUpdate(
				{ telegramId: data.telegramId },
				{
					$set: {
						firstName: data.firstName,
						lastName: data.lastName,
						firstNameZwift: data.firstNameZwift,
						lastNameZwift: data.lastNameZwift,
						telegramUsername: data.telegramUsername,
						cycleTrainer: data.cycleTrainer,
						zwiftPower: data.zwiftPower,
						yearBirth: data.yearBirth,
						category: data.category,
						gender: data.gender,
					},
				}
			);

		let rider = new Rider({
			firstName: data.firstName,
			lastName: data.lastName,
			firstNameZwift: data.firstNameZwift,
			lastNameZwift: data.lastNameZwift,
			telegramUsername: data.telegramUsername,
			telegramId: data.telegramId,
			cycleTrainer: data.cycleTrainer,
			zwiftPower: data.zwiftPower,
			yearBirth: data.yearBirth,
			category: data.category,
			gender: data.gender,
		});
		const riderSaved = await rider.save();
		if (riderSaved) {
			const result = await Result.find({ name: { $regex: data.lastNameZwift.slice(0, 4) } });
			//нашлось больше одного совпадения, значит не вставлять riderId в результат
			if (result.length === 1) {
				return await Result.findOneAndUpdate(
					{ _id: result[0]._id },
					{ $set: { riderId: riderSaved._id } }
				);
			}
			return riderSaved;
		} else {
			console.log('Ошибка при сохранении данных регистрации пользователя!');
		}
	} catch (error) {
		console.log(error);
	}
}
