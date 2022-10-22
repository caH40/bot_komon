import { Rider } from '../Model/Rider.js';
import { Team } from '../Model/Team.js';

export async function registrationToDB(data) {
	try {
		const capitan = await Rider.findOne({ telegramId: data.telegramId });

		const team = new Team({
			name: data.name,
			description: data.description,
			capitan: capitan._id,
		});

		const response = await team.save();
		if (response) {
			return response;
		} else {
			console.log('Ошибка при сохранении данных регистрации пользователя!');
		}
	} catch (error) {
		console.log(error);
	}
}
