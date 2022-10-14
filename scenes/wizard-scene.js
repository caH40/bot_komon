import { Scenes } from 'telegraf';

export const mainWizard = () => {
	try {
		return new Scenes.WizardScene(
			'sampleWizard',
			async ctx => {
				await ctx.reply('Это сцена Визард. Напишите скак вас зовут.');
				ctx.wizard.state.person = {};
				return ctx.wizard.next();
			},
			async ctx => {
				await ctx.reply('Сколько вам лет.');
				ctx.wizard.state.person.name = ctx.message.text;
				return ctx.wizard.next();
			},
			async ctx => {
				ctx.wizard.state.person.age = ctx.message.text;
				const name = ctx.wizard.state.person.name;
				const age = ctx.wizard.state.person.age;
				await ctx.reply(`Привет ${name} с возрастом ${age}`);
				await ctx.reply(`Выход из сцены`);
				return ctx.scene.leave();
			}
		);
	} catch (error) {
		console.log(error);
	}
};
