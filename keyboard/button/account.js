import { Markup } from 'telegraf';
import { verifyRoot, verifyAdmin } from '../../modules/verify-user.js';

export async function accountBtn(ctx) {
	try {
		const isAdmin = await verifyAdmin(ctx);
		const isRoot = await verifyRoot(ctx);
		if (isAdmin || isRoot)
			return [
				[Markup.button.callback('Мои результаты', 'account_myResults')],
				[Markup.button.callback('Регистрация', 'account_registration')],
				[Markup.button.callback('Команда', 'team')],
				[Markup.button.callback('Админ кабинет', 'account_adminAcc')],
				[Markup.button.callback('Главное меню', 'main')],
			];

		return [
			[Markup.button.callback('Мои результаты', 'account_myResults')],
			[Markup.button.callback('Регистрация', 'account_registration')],
			[Markup.button.callback('Команда', 'team')],
			[Markup.button.callback('Главное меню', 'main')],
		];
	} catch (error) {
		console.log(error);
	}
}
