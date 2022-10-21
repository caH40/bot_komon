export async function help(ctx) {
	try {
		await ctx.reply(
			`/start - стартовое приветствие\n/help - доступные команды\n/main - главное меню`
		);
		await ctx.deleteMessage();
	} catch (error) {
		console.log(error);
	}
}
