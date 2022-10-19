import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import { start } from './controllers/start.js';
import { help } from './controllers/help.js';
import { mainMenu } from './controllers/main.js';
import { callbackQuery } from './controllers/callback-query.js';
import { downloadProtocolBase } from './scenes/protocol/download.js';
import { uploadProtocolBase } from './scenes/protocol/upload.js';
import { confirmUploadProtocolScene } from './scenes/protocol/confirm.js';
import { downloadScheduleBase } from './scenes/schedule/download.js';
import { uploadScheduleBase } from './scenes/schedule/upload.js';
import { confirmUploadScheduleScene } from './scenes/schedule/confirm.js';
import { convertTime } from './utility/date-convert.js';
import { filterMessage } from './middleware/filter-message.js';

await mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to Mongo..'))
	.catch(error => console.log(error));

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([
	downloadProtocolBase(),
	uploadProtocolBase(),
	confirmUploadProtocolScene(),
	downloadScheduleBase(),
	uploadScheduleBase(),
	confirmUploadScheduleScene(),
]);

bot.use(session());
bot.use(stage.middleware());
bot.use(filterMessage);

bot.command('start', async ctx => await start(ctx));
bot.command('help', async ctx => await help(ctx));
bot.command('main', async ctx => await mainMenu(ctx));
bot.hears('wizard', async ctx => await ctx.scene.enter('sampleWizard'));
bot.command('excel', async ctx => ctx.scene.enter('uploadProtocol'));
bot.hears('base', async ctx => await ctx.scene.enter('sampleBase'));
bot.command('myid', async ctx => await ctx.reply(`Ваш ID Telegram: ${ctx.message.from.id}`));
bot.command('/test', async ctx => {
	// console.log(ctx.message.chat.type);
	const time = '1:00:00';
	console.log(convertTime(time));
});
bot.on('callback_query', async ctx => await callbackQuery(ctx));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
