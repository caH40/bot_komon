import { scheduleBtn } from '../keyboard/button/schedule-btn.js';

export async function getSchedule(ctx) {
	try {
		return await ctx.editMessageText(
			'<b>📅 Расписание серий и отдельных заездов.</b>',
			await scheduleBtn()
		);
	} catch (error) {
		console.log(error);
	}
}
