import { Markup } from 'telegraf';
import { Rider } from '../../Model/Rider.js';

export async function teamBtn(rider) {
	try {
		let isAllowed = false;
		if (rider.teamId) {
			const riderDB = await Rider.findOne({ _id: rider._id }).populate('teamId');
			isAllowed = riderDB.teamId.isAllowed;
		}
		// if (isAllowed) {
		return [
			rider.teamId?.name && isAllowed
				? [Markup.button.callback('Список райдеров 📜', `m_3_2_V--listRiders_${rider.teamId.name}`)]
				: [],
			rider.teamId?.name ? [] : [Markup.button.callback('Присоединиться 🙏', 'm_3_2_2_')],
			rider.teamId?.name ? [] : [Markup.button.callback('Создать ⚒️', 'm_3_2_3_S__create')],
			rider.teamId?.name && isAllowed
				? [Markup.button.callback('Покинуть команду 🚪', 'm_3_2_4_')]
				: [],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		];
		// } else {
		// 	return [[Markup.button.callback('Главное меню ❗️', 'main')]];
		// 	// return [[Markup.button.callback('Ваша заявка на рассмотрении', 'main')]];
		// }
	} catch (error) {
		console.log(error);
	}
}
export function teamsBtn(teams) {
	try {
		return [
			...teams.map(team => [
				Markup.button.callback(`${team.name} 👍`, `m_3_2_2_all_E__teamJoin_${team._id}`),
			]),
			[Markup.button.callback('Главное меню ❗️', 'main')],
		];
	} catch (error) {
		console.log(error);
	}
}
