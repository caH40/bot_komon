import { Scenes } from 'telegraf';

import { getTelegramId } from './telegramid.js';
import textJson from '../../locales/ru.json' assert { type: 'json' };
import { finalMessage } from '../../locales/template.js';
import { validationDescription, validationName } from './validation.js';

export function firstSceneCreateTeam() {
	try {
		const t = textJson.scenes.teamCreate;
		let counter = 0;
		const firstScene = new Scenes.BaseScene('firstSceneCreateTeam');
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
			const isValid = validationName(text);
			if (isValid) {
				ctx.session.data.account.name = text;
				return ctx.scene.enter('secondSceneCreateTeam');
			}
			await ctx.reply('t.first.wrong');
		});
		return firstScene;
	} catch (error) {
		console.log(error);
	}
}

export function secondSceneCreateTeam() {
	try {
		const t = textJson.scenes.teamCreate;
		let counter = 0;
		const secondScene = new Scenes.BaseScene('secondSceneCreateTeam');
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
			const isValid = validationDescription(text);
			if (isValid) {
				ctx.session.data.account.description = text;

				console.log(ctx.session.data.account);
				//
				return ctx.scene.leave();
			}
			await ctx.reply('t.second.wrong');
		});
		return secondScene;
	} catch (error) {
		console.log(error);
	}
}

async function attempts(ctx, counter) {
	try {
		const t = textJson.scenes.teamCreate;

		if (counter > 4) {
			return await await ctx.reply(t.attempts);
		}
	} catch (error) {
		console.log(error);
	}
}
