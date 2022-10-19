import { Scenes } from 'telegraf';

export const registrationWizard = () => {
	try {
		return new Scenes.WizardScene(
			'registration',
			async ctx => {
				await ctx.replyWithHTML(
					`Здравствуйте ${ctx.message.from.first_name}!\nРегистрация райдера проводится для правильного отображения Ваших заездов в протоколах соревнований.\n<i>Для выхода /quit</i>\n<b>Введите ваше имя (ru):</b>`
				);
				ctx.wizard.state.account = {};
				ctx.wizard.state.account.telegramUsername = ctx.message.from.username;
				ctx.wizard.state.account.telegramId = ctx.message.from.id;
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.firstName = text;
				await ctx.replyWithHTML(`<b>Введите вашу фамилию (ru):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.lastName = text;
				await ctx.replyWithHTML(`<b>Введите год рождения:</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.yearBirth = text;
				await ctx.replyWithHTML(`<b>Введите Ваш пол (мужской/женский):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.gender = text;
				await ctx.replyWithHTML(`<b>Введите firstname в Звифте (en):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.firstNameZwift = text;
				await ctx.replyWithHTML(`<b>Введите lastname в Звифте (en):</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.lastNameZwift = text;
				await ctx.replyWithHTML(`<b>Какой у Вас велотрейнер:</b>`);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.cycleTrainer = text;
				await ctx.replyWithHTML(`<b>Ссылка на Ваш аккаунт в https://zwiftpower.com/</b>`, {
					disable_web_page_preview: true,
				});
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/quit') return ctx.scene.leave();
				ctx.wizard.state.account.zwiftPower = text;
				await ctx.replyWithHTML(
					`Проверьте данные:\n<b>Имя:</b> ${ctx.wizard.state.account.firstName};\n<b>Фамилия:</b> ${ctx.wizard.state.account.lastName};\n<b>Год рождения:</b> ${ctx.wizard.state.account.yearBirth};\n<b>Пол:</b> ${ctx.wizard.state.account.gender};\n<b>Имя в Звифте:</b> ${ctx.wizard.state.account.firstNameZwift};\n<b>Фамилия в Звифте:</b> ${ctx.wizard.state.account.lastNameZwift};\n<b>Велотрейнер:</b> ${ctx.wizard.state.account.cycleTrainer};\n<b>ZwiftPower:</b> ${ctx.wizard.state.account.zwiftPower};\n========================\nЕсли всё верно, наберите /save\nДля повторного ввода данный /repeat\nДля выхода без сохранения информации /quit`
				);
				console.log(ctx.wizard.state.account);
				return ctx.wizard.next();
			},
			async ctx => {
				const text = ctx.message.text;
				if (text === '/save') return console.log('saved');
				if (text === '/repeat') return await ctx.scene.enter('registration');
				if (text === '/quit') return await ctx.scene.leave();
			}
		);
	} catch (error) {
		console.log(error);
	}
};
