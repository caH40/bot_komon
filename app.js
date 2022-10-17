import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import { start } from './controllers/start.js';
import { help } from './controllers/help.js';
import { mainMenu } from './controllers/main.js';
import { callbackQuery } from './controllers/callback-query.js';
import { downloadProtocolBase } from './scenes/protocol/download.js';
import { uploadProtocolBase } from './scenes/protocol/upload.js';
import { confirmUploadScene } from './scenes/protocol/confirm.js';

await mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to Mongo..'))
	.catch(error => console.log(error));

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([
	downloadProtocolBase(),
	uploadProtocolBase(),
	confirmUploadScene(),
]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => await start(ctx));
bot.command('help', async ctx => await help(ctx));
bot.command('main', async ctx => await mainMenu(ctx));
bot.hears('wizard', async ctx => await ctx.scene.enter('sampleWizard'));
bot.command('excel', async ctx => ctx.scene.enter('uploadProtocol'));
bot.hears('base', async ctx => await ctx.scene.enter('sampleBase'));
bot.command('/file', async ctx => {
	const path = '☢️';
	console.log(path.length);
});
bot.on('callback_query', async ctx => await callbackQuery(ctx));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
