import { Scenes } from 'telegraf';

import { registrationToDB } from '../../controllersDB/registration-save.js';
import { getTelegramId } from './telegramid.js';
import textJson from '../../locales/ru.json' assert { type: 'json' };
import { finalMessage } from '../../locales/template.js';
import {
	validationGender,
	validationLink,
	validationNameEn,
	validationNameRus,
	validationYear,
} from './validation.js';

export function firstSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const firstScene = new Scenes.BaseScene('firstSceneReg');
		firstScene.enter(async ctx => {
			ctx.session.data.account = {};
			getTelegramId(ctx);
			const nameTg = ctx.session.data.account.first_name;
			await ctx.replyWithHTML(t.first.welcome1 + nameTg + t.first.welcome2);
			await ctx.replyWithHTML(t.first.question);
		});
		firstScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		firstScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			ctx.session.data.messagesIdForDelete.push(ctx.message.message_id);
			const isValid = validationNameRus(text);
			if (isValid) {
				ctx.session.data.account.firstName = text;
				return ctx.scene.enter('secondSceneReg');
			}
			await ctx.reply(t.first.wrong);
		});
		return firstScene;
	} catch (error) {
		console.log(error);
	}
}

export function secondSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const secondScene = new Scenes.BaseScene('secondSceneReg');
		secondScene.enter(async ctx => await ctx.replyWithHTML(t.second.question));
		secondScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		secondScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			const isValid = validationNameRus(text);
			if (isValid) {
				ctx.session.data.account.lastName = text;
				return ctx.scene.enter('thirdSceneReg');
			}
			await ctx.reply(t.second.wrong);
		});
		return secondScene;
	} catch (error) {
		console.log(error);
	}
}

export function thirdSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const thirdScene = new Scenes.BaseScene('thirdSceneReg');
		thirdScene.enter(async ctx => await ctx.replyWithHTML(t.third.question));
		thirdScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		thirdScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			const isValid = validationYear(text);
			if (isValid) {
				ctx.session.data.account.yearBirth = text;
				return ctx.scene.enter('fourthSceneReg');
			}
			await ctx.reply(t.third.wrong);
		});
		return thirdScene;
	} catch (error) {
		console.log(error);
	}
}

export function fourthSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const fourthScene = new Scenes.BaseScene('fourthSceneReg');
		fourthScene.enter(async ctx => await ctx.replyWithHTML(t.fourth.question));
		fourthScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		fourthScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text?.toLowerCase();
			const isValid = validationGender(text);
			if (isValid) {
				ctx.session.data.account.gender = text;
				return ctx.scene.enter('fifthSceneReg');
			}
			await ctx.reply(t.fourth.wrong);
		});
		return fourthScene;
	} catch (error) {
		console.log(error);
	}
}

export function fifthSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const fifthScene = new Scenes.BaseScene('fifthSceneReg');
		fifthScene.enter(async ctx => await ctx.replyWithHTML(t.fifth.question));
		fifthScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		fifthScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			const isValid = validationNameEn(text);
			if (isValid) {
				ctx.session.data.account.firstNameZwift = text;
				return ctx.scene.enter('sixthSceneReg');
			}
			await ctx.reply(t.fifth.wrong);
		});
		return fifthScene;
	} catch (error) {
		console.log(error);
	}
}

export function sixthSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const sixthScene = new Scenes.BaseScene('sixthSceneReg');
		sixthScene.enter(async ctx => await ctx.replyWithHTML(t.sixth.question));
		sixthScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		sixthScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			const isValid = validationNameEn(text);
			if (isValid) {
				ctx.session.data.account.lastNameZwift = text;
				return ctx.scene.enter('seventhSceneReg');
			}
			await ctx.reply(t.sixth.wrong);
		});
		return sixthScene;
	} catch (error) {
		console.log(error);
	}
}

export function seventhSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const seventhScene = new Scenes.BaseScene('seventhSceneReg');
		seventhScene.enter(async ctx => await ctx.replyWithHTML(t.seventh.question));
		seventhScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		seventhScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			const isValid = validationNameEn(text);
			if (isValid) {
				ctx.session.data.account.cycleTrainer = text;
				return ctx.scene.enter('eighthSceneReg');
			}
			await ctx.reply(t.seventh.wrong);
		});
		return seventhScene;
	} catch (error) {
		console.log(error);
	}
}

export function eighthSceneReg() {
	try {
		const t = textJson.scenes.registration;
		let counter = 0;
		const eighthScene = new Scenes.BaseScene('eighthSceneReg');
		eighthScene.enter(async ctx => {
			await ctx.replyWithHTML(t.eighth.question, {
				disable_web_page_preview: true,
			});
		});
		eighthScene.command('save', async ctx => {
			const response = await registrationToDB(ctx.session.data.account);
			if (response) {
				await ctx.reply(t.eighth.successfulDB);
			} else {
				await ctx.reply(t.eighth.wrongDB);
			}
			return await ctx.scene.leave();
		});
		eighthScene.command('repeat', async ctx => await ctx.scene.enter('firstSceneReg'));
		eighthScene.command('quit', async ctx => await ctx.scene.leave());
		eighthScene.command('/quit', async ctx => {
			await ctx.reply(t.quit);
			return await ctx.scene.leave();
		});
		eighthScene.on('message', async ctx => {
			counter++;
			const isManyAttempts = await attempts(ctx, counter);
			if (isManyAttempts) return await ctx.scene.leave();

			const text = ctx.message.text;
			const isValid = validationLink(text);
			if (isValid) {
				ctx.session.data.account.zwiftPower = text;
				return await ctx.replyWithHTML(finalMessage(ctx), {
					disable_web_page_preview: true,
				});
			}
			await ctx.reply(t.eighth.wrong, {
				disable_web_page_preview: true,
			});
		});
		return eighthScene;
	} catch (error) {
		console.log(error);
	}
}

async function attempts(ctx, counter) {
	try {
		const t = textJson.scenes.registration;

		if (counter > 4) {
			return await await ctx.reply(t.attempts);
		}
	} catch (error) {
		console.log(error);
	}
}
