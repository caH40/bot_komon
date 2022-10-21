import { Scenes } from 'telegraf';
import { registrationToDB } from '../../controllersDB/registration-save.js';
import { getTelegramId } from './telegraid.js';

import {
	validationGender,
	validationLink,
	validationNameEn,
	validationNameRus,
	validationYear,
} from './validation.js';

export const firstSceneReg = new Scenes.BaseScene('firstSceneReg');
firstSceneReg.enter(async ctx => {
	ctx.session.data.account = {};
	getTelegramId(ctx);
	await ctx.replyWithHTML(
		`Здравствуйте ${ctx.session.data.account.first_name}!\nРегистрация райдера проводится для правильного отображения Ваших заездов в протоколах соревнований.\n<i>Для выхода нажсите /quit</i>`
	);
	await ctx.replyWithHTML(`<b>Введите ваше имя (ru):</b>`);
});
firstSceneReg.on('message', async ctx => {
	const text = ctx.message.text;
	ctx.session.data.messagesIdForDelete.push(ctx.message.message_id);

	const isValid = validationNameRus(text);
	if (isValid) {
		ctx.session.data.account.firstName = text;

		return ctx.scene.enter('secondSceneReg');
	}
	await ctx.reply(
		'Имя может содержать только буквы на кириллице и должно быть больше 2х букв! Попробуйте еще раз.'
	);
});
//===========================================================================================

export const secondSceneReg = new Scenes.BaseScene('secondSceneReg');
secondSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Введите вашу фамилию (ru):</b>`);
});
secondSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationNameRus(text);
	if (isValid) {
		ctx.session.data.account.lastName = text;
		return ctx.scene.enter('thirdSceneReg');
	}
	await ctx.reply(
		'Фамилия может содержать только буквы на кириллице и должно быть больше 2х букв! Попробуйте еще раз.'
	);
});
//==========================================================================================

export const thirdSceneReg = new Scenes.BaseScene('thirdSceneReg');
thirdSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Введите год рождения (4ре цифры):</b>`);
});
thirdSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationYear(text);
	if (isValid) {
		ctx.session.data.account.yearBirth = text;
		return ctx.scene.enter('fourthSceneReg');
	}
	await ctx.reply('Год должен состоять из 4х цифр! Попробуйте еще раз.');
});

//==========================================================================================
export const fourthSceneReg = new Scenes.BaseScene('fourthSceneReg');
fourthSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Введите Ваш пол (мужской/женский):</b>`);
});
fourthSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationGender(text);
	if (isValid) {
		ctx.session.data.account.gender = text;
		return ctx.scene.enter('fifthSceneReg');
	}
	await ctx.reply('Необходимо ввести "мужской" или "женский".');
});

//==========================================================================================
export const fifthSceneReg = new Scenes.BaseScene('fifthSceneReg');
fifthSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Введите firstname в Звифте (en):</b>`);
});
fifthSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationNameEn(text);
	if (isValid) {
		ctx.session.data.account.firstNameZwift = text;
		return ctx.scene.enter('sixthSceneReg');
	}
	await ctx.reply('Ведите название firstname используя латинский алфавит (En)');
});

//==========================================================================================
export const sixthSceneReg = new Scenes.BaseScene('sixthSceneReg');
sixthSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Введите lastname в Звифте (en):</b>`);
});
sixthSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationNameEn(text);
	if (isValid) {
		ctx.session.data.account.lastNameZwift = text;
		return ctx.scene.enter('seventhSceneReg');
	}
	await ctx.reply('Ведите название lastname используя латинский алфавит (En)');
});

//==========================================================================================
export const seventhSceneReg = new Scenes.BaseScene('seventhSceneReg');
seventhSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Какой у Вас велотрейнер:</b>`);
});
seventhSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationNameEn(text);
	if (isValid) {
		ctx.session.data.account.cycleTrainer = text;
		return ctx.scene.enter('eighthSceneReg');
	}
	await ctx.reply('Ведите название велотрейнера используя латинский алфавит (En)');
});

//==========================================================================================
export const eighthSceneReg = new Scenes.BaseScene('eighthSceneReg');
eighthSceneReg.enter(async ctx => {
	await ctx.replyWithHTML(`<b>Ссылка на Ваш аккаунт в https://zwiftpower.com/</b>`, {
		disable_web_page_preview: true,
	});
});
eighthSceneReg.command('save', async ctx => {
	const response = await registrationToDB(ctx.session.data.account);
	if (response) {
		await ctx.reply('Данные успешно сохранены!');
	} else {
		await ctx.reply('Что то пошло не так, повторите попытку позже.');
	}
	return await ctx.scene.leave();
});
eighthSceneReg.command('repeat', async ctx => await ctx.scene.enter('firstSceneReg'));
eighthSceneReg.command('quit', async ctx => await ctx.scene.leave());

eighthSceneReg.on('message', async ctx => {
	const text = ctx.message.text;

	const isValid = validationLink(text);
	if (isValid) {
		ctx.session.data.account.zwiftPower = text;
		return await ctx.replyWithHTML(
			`Проверьте данные:\n<b>Имя:</b> ${ctx.session.data.account.firstName};\n<b>Фамилия:</b> ${ctx.session.data.account.lastName};\n<b>Год рождения:</b> ${ctx.session.data.account.yearBirth};\n<b>Пол:</b> ${ctx.session.data.account.gender};\n<b>Имя в Звифте:</b> ${ctx.session.data.account.firstNameZwift};\n<b>Фамилия в Звифте:</b> ${ctx.session.data.account.lastNameZwift};\n<b>Велотрейнер:</b> ${ctx.session.data.account.cycleTrainer};\n<b>ZwiftPower:</b> ${ctx.session.data.account.zwiftPower};\n========================\nЕсли всё верно, для <b>сохранения</b> наберите <u>/save</u>\nДля <b>повторного ввода</b> данный <u>/repeat</u>\nДля выхода <b>без сохранения</b> информации <u>/quit</u>`,
			{
				disable_web_page_preview: true,
			}
		);
	}
	await ctx.reply(
		'Проверьте правильность ссылки на аккаунт, она должна быть вида https://zwiftpower.com/profile.php?z=номер ',
		{
			disable_web_page_preview: true,
		}
	);
});

//==========================================================================================
