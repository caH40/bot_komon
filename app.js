import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';
import mongoose from 'mongoose';

import { start } from './controllers/start.js';
import { help } from './controllers/help.js';
import { mainMenu } from './controllers/main.js';
import { callbackQuery } from './controllers/callback-query.js';
import { getExcel } from './file-manager/xlsx/excel.js';
import { downloadXlsx } from './file-manager/axios/download.js';
import { getProtocolBase } from './scenes/scene.js';

await mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to Mongo..'))
	.catch(error => console.log(error));

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([getProtocolBase()]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => await start(ctx));
bot.command('help', async ctx => await help(ctx));
bot.command('main', async ctx => await mainMenu(ctx));
bot.hears('wizard', async ctx => await ctx.scene.enter('sampleWizard'));
bot.command('excel', async ctx => await getExcel());
bot.hears('base', async ctx => await ctx.scene.enter('sampleBase'));
bot.hears('file', async ctx => await downloadXlsx(path, name));
bot.on('callback_query', async ctx => await callbackQuery(ctx));

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
