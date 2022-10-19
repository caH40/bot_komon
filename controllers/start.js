export async function start(ctx) {
	try {
		const userName = ctx.message.from.first_name;

		ctx.replyWithHTML(
			`Привет ${
				userName ? userName : 'незнакомец'
			}! Предоставляю информацию о заездах в Звифт, организуемых командой <b>KOM-on</b>. \nДля запуска /main`,
			{
				parse_mode: 'html',
				disable_web_page_preview: true,
			}
		);
	} catch (error) {
		console.log(error);
	}
}
