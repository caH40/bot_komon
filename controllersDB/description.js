import { Team } from '../Model/Team.js';

export async function descriptionUpdate(userTelegramId, text) {
	try {
		const teamsDB = await Team.find().populate('capitan');
		const _id = teamsDB.find(team => team.capitan.telegramId === userTelegramId)?._id;

		if (!_id) console.log('не нашел команду для изменения описания');

		return await Team.findOneAndUpdate({ _id }, { $set: { description: text } });
	} catch (error) {
		console.log(error);
	}
}
