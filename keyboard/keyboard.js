import { Markup } from 'telegraf';
// главное меню
export const mainMenuKeyboard = Markup.inlineKeyboard([
	[Markup.button.callback('Результаты заездов', 'main_series')],
	[Markup.button.callback('Расписание заездов', 'main_schedule')],
	[Markup.button.callback('Личный кабинет', 'main_account')],
]);
// меню выбора результатов серий
export const seriesKeyboard = Markup.inlineKeyboard([
	[Markup.button.callback('Зимняя серия', 'series_autumn2022')],
	[Markup.button.callback('Осенняя серия', 'series_winter2022')],
	[Markup.button.callback('Главное меню', 'main')],
]);
// меню выбора расписания серий
export function scheduleKeyboard(series) {
	const keyboard = Markup.inlineKeyboard([
		series.map(elm => Markup.button.callback(elm.name, 'schedule_' + elm._id)),
		[Markup.button.callback('Главное меню', 'main')],
	]);
	return keyboard;
}
// меню выбора личного кабинета
export const accountKeyboard = Markup.inlineKeyboard([
	[Markup.button.callback('Мои результаты', 'account_myResults')],
	[Markup.button.callback('Регистрация', 'account_registration')],
	[Markup.button.callback('Команда', 'team')],
	[Markup.button.callback('Админ кабинет', 'account_adminAcc')],
	[Markup.button.callback('Главное меню', 'main')],
]);
// меню выбора зачетов серии
export function resultSeriesKeyboard(series) {
	return Markup.inlineKeyboard([
		[Markup.button.callback('Генеральный зачет', `result_General_${series}`)],
		[Markup.button.callback('Командный зачет', `result_Team_${series}`)],
		[Markup.button.callback('Результаты этапов', `result_Stages_${series}`)],
		[Markup.button.callback('Главное меню', 'main')],
	]);
}
// меню выбора админ кабинета
export const accountAdminKeyboard = Markup.inlineKeyboard([
	[Markup.button.callback('Загрузить протокол', 'admin_getProtocol')],
	[Markup.button.callback('Загрузить расписание', 'admin_getSchedule')],
	[Markup.button.callback('Главное меню', 'main')],
]);

// меню выбора результатов этапов серии
export function resultStagesKeyboard(series) {
	const dataDB = ['1', '2', '3', '4'];
	const buttons = dataDB.map(stage => [Markup.button.callback(stage, `stage_${series}_${stage}`)]);

	return Markup.inlineKeyboard([...buttons, [Markup.button.callback('Главное меню', 'main')]]);
}
