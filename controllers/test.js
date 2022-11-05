export async function test(ctx) {
	try {
		await ctx.telegram.sendMessage(5085956560, 'hi');
	} catch (error) {
		console.log(error);
	}
}
