import { Markup } from 'telegraf';
import { mainBtn } from './button/main.js';
import { resultSeriesBtn } from './button/schedule-btn.js';
import { teamBtn, teamsBtn } from './button/team.js';
// главное меню
export async function mainMenuKeyboard(ctx) {
	return { parse_mode: 'html', ...Markup.inlineKeyboard(await mainBtn(ctx)) };
}
export const accountKeyboard = {
	parse_mode: 'html',
	...Markup.inlineKeyboard([
		[Markup.button.callback('Мои результаты 🏅', 'm_3_1_V--myResults')],
		[Markup.button.callback('Регистрация 🆔', 'account_registration')],
		[Markup.button.callback('Команда 🤝', 'm_3_2_')],
		[Markup.button.callback('Главное меню ❗️', 'main')],
	]),
};

export function teamKeyboard(rider) {
	return { parse_mode: 'html', ...Markup.inlineKeyboard(teamBtn(rider)) };
}
export function teamForApprovalKeyboard(teamId) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			Markup.button.callback('Одобрить', `m_4_team_add_Y_${teamId}`),
			Markup.button.callback('Отклонить', `m_4_team_add_N_${teamId}`),
		]),
	};
}

export function teamsKeyboard(teams) {
	return { parse_mode: 'html', ...Markup.inlineKeyboard(teamsBtn(teams)) };
}

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
// меню выбора зачетов серии
export async function resultSeriesKeyboard(cbqData) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard(await resultSeriesBtn(cbqData)),
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
export function teamLeaveKeyboard(userId) {
	return {
		parse_mode: 'html',
		...Markup.inlineKeyboard([
			[Markup.button.callback('Да, хочу выйти из команды ❌', `m_3_2_4_1_E--teamLeave_${userId}`)],
			[Markup.button.callback('<< назад >>', `m_3_2_`)],

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
export const adminKeyboard = {
	parse_mode: 'html',
	...Markup.inlineKeyboard([
		[Markup.button.callback('Управление командами', 'm_4_1_')],
		[Markup.button.callback('Загрузить протокол', 'admin_getProtocol')],
		[Markup.button.callback('Загрузить расписание', 'admin_getSchedule')],
		[Markup.button.callback('Главное меню ❗️', 'main')],
	]),
};
export const adminTeamKeyboard = {
	parse_mode: 'html',
	...Markup.inlineKeyboard([
		[Markup.button.callback('Заявки на создание команды', 'm_4_1_1_E')],
		[Markup.button.callback('Удалить команду', 'm_4_1_2_')],
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
