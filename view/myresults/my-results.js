import { mainMenuKeyboard, mobVsDesKeyboard } from '../../keyboard/keyboard.js';
import { Result } from '../../Model/Result.js';
import { Rider } from '../../Model/Rider.js';

export async function myResults(ctx) {
	try {
		await ctx.editMessageText(
			`❗<b>Главное меню. Выбор основных функций.</b>❗\n<i>main</i>`,
			await mainMenuKeyboard(ctx)
		);

		const userId = ctx.update.callback_query.message.chat.id;

		const riderDB = await Rider.findOne({ telegramId: userId });
		if (!riderDB) {
			return await ctx.reply(
				'Вы не зарегистрировались в боте. Для корректного отображения информации необходимо зарегистрироваться!'
			);
		}

		const resultsDB = await Result.find({ riderId: riderDB._id });
		if (resultsDB.length === 0) {
			return await ctx.reply(
				'Ваши результаты не найдены!\nЕсли Вы участвовали в заездах проводимых командой KOM-on, попробуйте изменить данные в аккаунте (регистрация) на валидные.'
			);
		}

		// if (view === 'Des') return resultsViewStageDes(ctx, charts, title);
		// if (view === 'Mob') return resultsViewStageMob(ctx, charts, title);
	} catch (error) {
		console.log(error);
	}
}
