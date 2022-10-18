export async function beingDeveloped(ctx) {
	try {
		await ctx.reply('В разработке...');
	} catch (error) {
		console.log(error);
	}
}
