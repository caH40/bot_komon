import { Markup } from 'telegraf';
// главное меню
export const mainMenuKey = Markup.inlineKeyboard([
	[Markup.button.callback('Результаты заездов', 'main_series')],
	[Markup.button.callback('Расписание заездов', 'main_schedule')],
	[Markup.button.callback('Личный кабинет', 'main_account')],
]);
// меню выбора результатов серий
export const series = Markup.inlineKeyboard([
	[Markup.button.callback('Зимняя серия', 'series_autumn2022')],
	[Markup.button.callback('Осенняя серия', 'series_winter2022')],
	[Markup.button.callback('Главное меню', 'main')],
]);
// меню выбора расписания серий
export const schedule = Markup.inlineKeyboard([
	[Markup.button.callback('Зимняя серия', 'schedule_autumn2022')],
	[Markup.button.callback('Осенняя серия', 'schedule_winter2022')],
	[Markup.button.callback('Главное меню', 'main')],
]);
// меню выбора личного кабинета
export const account = Markup.inlineKeyboard([
	[Markup.button.callback('Мои результаты', 'account_myResults')],
	[Markup.button.callback('Регистрация', 'account_registration')],
	[Markup.button.callback('Главное меню', 'main')],
]);
// меню выбора личного кабинета
export function resultSeries(series) {
	return Markup.inlineKeyboard([
		[Markup.button.callback('Генеральный зачет', `result_General_${series}`)],
		[Markup.button.callback('Командный зачет', `result_Team_${series}`)],
		[Markup.button.callback('Результаты этапов', `result_Stages_${series}`)],
		[Markup.button.callback('Главное меню', 'main')],
	]);
}
export function resultStages(series) {
	const dataDB = ['1', '2', '3', '4'];
	const buttons = dataDB.map(stage => [Markup.button.callback(stage, `stage_${series}_${stage}`)]);

	return Markup.inlineKeyboard([...buttons, [Markup.button.callback('Главное меню', 'main')]]);
}
