export async function help(ctx) {
	try {
		await ctx.reply(`/start - стартовое приветствие\n/help - доступные команды`);
	} catch (error) {
		console.log(error);
	}
}
