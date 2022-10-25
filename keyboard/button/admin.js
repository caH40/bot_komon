import { Markup } from 'telegraf';

export async function buttonCatRiders(ctx) {
	try {
		return [
			[Markup.button.callback('Результаты заездов 🏆', 'main_series')],
			[Markup.button.callback('Расписание заездов 📅', 'main_schedule')],
			[Markup.button.callback('Личный кабинет 🔑', 'main_account')],
		];
	} catch (error) {
		console.log(error);
	}
}
export function buttonCatFromStageRiders(stages) {
	try {
		return [
			...stages.map(stage => [
				Markup.button.callback(
					`${stage.seriesId.name}, Этап ${stage.number}, ${stage.type},   ${new Date(
						stage.dateStart
					).toLocaleDateString()} ⚠️`,
					`m_4_4_2_E__${stage._id}`
				),
			]),

			[Markup.button.callback('<< назад >>', `m_4_4_`)],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		];
	} catch (error) {
		console.log(error);
	}
}
