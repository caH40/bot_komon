import { Markup } from 'telegraf';

export async function teamBtn(ctx, rider) {
	try {
		return [
			rider.teamId?.name
				? [Markup.button.callback('Список райдеров 📜', 'm_3_2_V--listRiders')]
				: [],
			rider.teamId?.name ? [] : [Markup.button.callback('Присоединиться 🙏', 'm_3_2_2_')],
			[
				rider.teamId?.name ? [] : Markup.button.callback('Создать ⚒️', 'm_3_2_V__sceneCreate'),
				Markup.button.callback('Выйти 🚪', 'm_3_2_4_'),
			],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		];
	} catch (error) {
		console.log(error);
	}
}
