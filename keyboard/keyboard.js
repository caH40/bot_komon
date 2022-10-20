import { Markup } from 'telegraf';
import { accountBtn } from './button/account.js';
// главное меню
export const mainMenuKeyboard = {
	parse_mode: 'html',
	...Markup.inlineKeyboard([
		[Markup.button.callback('Результаты заездов 🏆', 'main_series')],
		[Markup.button.callback('Расписание заездов 📅', 'main_schedule')],
		[Markup.button.callback('Личный кабинет 🔑', 'main_account')],
	]),
};
// меню выбора результатов серий main_series
export function seriesKeyboard(series) {
	const keyboard = {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			...series.map(elm => [Markup.button.callback(`${elm.name} 🚵‍♀️`, 'series_' + elm._id)]),
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};
	return keyboard;
}
// меню выбора расписания серий
export function scheduleKeyboard(series) {
	const keyboard = {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			...series.map(elm => [Markup.button.callback(`${elm.name} 🚵‍♀️`, 'view_schedule_' + elm._id)]),
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};
	return keyboard;
}
// меню выбора личного кабинета
export async function accountKeyboard(ctx) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard(await accountBtn(ctx)),
	};
}
// меню выбора зачетов серии
export function resultSeriesKeyboard(seriesId) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			[Markup.button.callback('Результаты этапов 📝', `result_Stages_${seriesId}`)],
			[Markup.button.callback('Генеральный зачет 👑', `result_General_${seriesId}`)],
			[Markup.button.callback('Командный зачет 🤝', `result_Team_${seriesId}`)],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};
}
export function resultStageCatKeyboard(stageId) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			[Markup.button.callback('Общий протокол 📌', `view_result_Stage_T_${stageId}`)],
			[Markup.button.callback('Категория "A" 💪', `view_result_Stage_A_${stageId}`)],
			[Markup.button.callback('Категория "B" 👊', `view_result_Stage_B_${stageId}`)],
			[Markup.button.callback('Категория "C" ✌️', `view_result_Stage_C_${stageId}`)],
			[Markup.button.callback('Категория "W" 👍', `view_result_Stage_W_${stageId}`)],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};
}
export function resultSeriesGeneralKeyboard(seriesId) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			[Markup.button.callback('Категория "A" 💪', `view_result_GSeries_A_${seriesId}`)],
			[Markup.button.callback('Категория "B" 👊', `view_result_GSeries_B_${seriesId}`)],
			[Markup.button.callback('Категория "C" ✌️', `view_result_GSeries_C_${seriesId}`)],
			[Markup.button.callback('Категория "W" 👍', `view_result_GSeries_W_${seriesId}`)],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};
}
// меню выбора админ кабинета
export const accountAdminKeyboard = {
	parse_mode: 'html',
	...Markup.inlineKeyboard([
		[Markup.button.callback('Загрузить протокол', 'admin_getProtocol')],
		[Markup.button.callback('Загрузить расписание', 'admin_getSchedule')],
		[Markup.button.callback('Главное меню ❗️', 'main')],
	]),
};

// меню выбора результатов этапов серии
export function resultStagesKeyboard(series) {
	const keyboard = {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			...series.map(stage => [
				Markup.button.callback(
					`Этап ${stage.number}, ${new Date(stage.dateStart).toLocaleDateString()}, ${
						stage.type
					} 🏁`,
					`stage_${stage._id}`
				),
			]),
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};

	return keyboard;
}
export const clearCharts = {
	parse_mode: 'html',
	...Markup.inlineKeyboard([[Markup.button.callback('Очистить сообщения', `clear`)]]),
};

export function mobVsDesKeyboard(queryData) {
	const keyboard = {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			[
				Markup.button.callback('Десктоп 💻', `Des_${queryData}`),
				Markup.button.callback('Смартфон 📱', `Mob_${queryData}`),
			],
			[Markup.button.callback('Главное меню ❗️', 'main')],
		]),
	};

	return keyboard;
}
