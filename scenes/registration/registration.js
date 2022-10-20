import { Scenes } from 'telegraf';
import { registrationToDB } from '../../controllersDB/registration-save.js';

export function registrationWizard() {
	try {
		return new Scenes.WizardScene(
			'registration',
			async ctx => {
				ctx.wizard.state.account = {};
				if (ctx.update.callback_query) {
					ctx.wizard.state.account.telegramUsername =
						ctx.update.callback_query.message.chat.username;
					ctx.wizard.state.account.telegramId = ctx.update.callback_query.message.chat.id;
					ctx.wizard.state.account.first_name = ctx.update.callback_query.message.chat.first_name;
				} else {
					ctx.wizard.state.account.telegramUsername = ctx.message.from.username;
					ctx.wizard.state.account.telegramId = ctx.message.from.id;
					ctx.wizard.state.account.first_name = ctx.message.from.first_name;
				}
				await ctx.replyWithHTML(
					`Здравствуйте ${ctx.wizard.state.account.first_name}!\nРегистрация райдера проводится для правильного отображения Ваших заездов в протоколах соревнований.\n<i>Для выхода нажсите /quit</i>\n<b>Введите ваше имя (ru):</b>`
				);
				return ctx.wizard.next();
			},
			async ctx => {
				try {
					const text = await checkText(ctx);
					if (!text) {
						await ctx.replyWithHTML('Вы вышли из регистрации!');
						return ctx.scene.leave();
					}
					ctx.wizard.state.account.firstName = text;
					await ctx.replyWithHTML(`<b>Введите вашу фамилию (ru):</b>`);
					return ctx.wizard.next();
				} catch (error) {
					console.log(error);
				}
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				ctx.wizard.state.account.lastName = text;
				await ctx.replyWithHTML(`<b>Введите год рождения (4ре цифры):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				ctx.wizard.state.account.yearBirth = text;
				await ctx.replyWithHTML(`<b>Введите Ваш пол (мужской/женский):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				if (text !== 'мужской' && text !== 'женский') {
					await ctx.reply(`Необходимо ввести "мужской" или "женский"`);
					ctx.wizard.back();
					return ctx.wizard.steps[ctx.wizard.cursor](ctx);
				}

				ctx.wizard.state.account.gender = text;
				await ctx.replyWithHTML(`<b>Введите firstname в Звифте (en):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				ctx.wizard.state.account.firstNameZwift = text;
				await ctx.replyWithHTML(`<b>Введите lastname в Звифте (en):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				ctx.wizard.state.account.lastNameZwift = text;
				await ctx.replyWithHTML(`<b>Какой у Вас велотрейнер:</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				ctx.wizard.state.account.cycleTrainer = text;
				await ctx.replyWithHTML(`<b>Ссылка на Ваш аккаунт в https://zwiftpower.com/</b>`, {
					disable_web_page_preview: true,
				});
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (!text) {
					await ctx.replyWithHTML('Вы вышли из регистрации!');
					return ctx.scene.leave();
				}
				ctx.wizard.state.account.zwiftPower = text;
				await ctx.replyWithHTML(
					`Проверьте данные:\n<b>Имя:</b> ${ctx.wizard.state.account.firstName};\n<b>Фамилия:</b> ${ctx.wizard.state.account.lastName};\n<b>Год рождения:</b> ${ctx.wizard.state.account.yearBirth};\n<b>Пол:</b> ${ctx.wizard.state.account.gender};\n<b>Имя в Звифте:</b> ${ctx.wizard.state.account.firstNameZwift};\n<b>Фамилия в Звифте:</b> ${ctx.wizard.state.account.lastNameZwift};\n<b>Велотрейнер:</b> ${ctx.wizard.state.account.cycleTrainer};\n<b>ZwiftPower:</b> ${ctx.wizard.state.account.zwiftPower};\n========================\nЕсли всё верно, для сохранения наберите /save\nДля повторного ввода данный /repeat\nДля выхода без сохранения информации /quit`
				);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = await checkText(ctx);
				if (text === '/save') {
					const response = await registrationToDB(ctx.wizard.state.account);
					if (response) {
						await ctx.reply('Данные успешно сохранены!');
					} else {
						await ctx.reply('Что то пошло не так, повторите попытку позже.');
					}
					return await ctx.scene.leave();
				}
				if (text === '/repeat') return await ctx.scene.enter('registration');
				if (text === '/quit') return await ctx.scene.leave();
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function checkText(ctx) {
	if (!ctx.message) {
		await ctx.replyWithHTML('❗При регистрации необходимо вводить только символы❗\n');
		return false;
	}
	if (ctx.message.text === '/quit') return false;
	return ctx.message.text;
}
