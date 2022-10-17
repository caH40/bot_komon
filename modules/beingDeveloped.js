export async function beingDeveloped(ctx) {
	try {
		await ctx.reply('Находится в разработке...');
	} catch (error) {
		console.log(error);
	}
}
