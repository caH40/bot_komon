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
		if (!response) return console.log('Ошибка при сохранении данных команды!');

		const rider = await Rider.findOneAndUpdate(
			{ telegramId: data.telegramId },
			{ $set: { teamId: response._id } }
		);
		if (rider) {
			return rider;
		} else {
			console.log(`Ошибка при сохранении teamId ${response._id} в документа Rider`);
		}
	} catch (error) {
		console.log(error);
	}
}
