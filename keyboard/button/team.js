import { Markup } from 'telegraf';

export function teamBtn(rider) {
	try {
		console.log('rider', rider);
		return [
			rider.teamId?.name
				? [Markup.button.callback('Список райдеров 📜', `m_3_2_V--listRiders_${rider.teamId.name}`)]
				: [],
			rider.teamId?.name ? [] : [Markup.button.callback('Присоединиться 🙏', 'm_3_2_2_')],
			rider.teamId?.name ? [] : [Markup.button.callback('Создать ⚒️', 'm_3_2_3_S__create')],
			rider.teamId?.name ? [Markup.button.callback('Покинуть команду 🚪', 'm_3_2_4_')] : [],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		];
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
