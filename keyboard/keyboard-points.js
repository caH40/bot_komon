import { Markup } from 'telegraf';

export function sprinterKeyboard(results, isClicked) {
	try {
		return {
			parse_mode: 'html',
			...Markup.inlineKeyboard([
				[
					isClicked?.['100']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback(
								'100',
								`{"zwiftRiderId":${results.zwiftRiderId}, "points":100}`
						  ),
					isClicked?.['70']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('70', `{"zwiftRiderId":${results.zwiftRiderId}, "points":70}`),
					isClicked?.['50']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('50', `{"zwiftRiderId":${results.zwiftRiderId}, "points":50}`),
					isClicked?.['30']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('30', `{"zwiftRiderId":${results.zwiftRiderId}, "points":30}`),
					isClicked?.['20']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('20', `{"zwiftRiderId":${results.zwiftRiderId}, "points":20}`),
				],
				[
					isClicked?.['10']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('10', `{"zwiftRiderId":${results.zwiftRiderId}, "points":10}`),
					isClicked?.['5']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('5', `{"zwiftRiderId":${results.zwiftRiderId}, "points":5}`),
					isClicked?.['3']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('3', `{"zwiftRiderId":${results.zwiftRiderId}, "points":3}`),
					isClicked?.['2']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('2', `{"zwiftRiderId":${results.zwiftRiderId}, "points":2}`),
					isClicked?.['1']
						? Markup.button.callback('1', '1', true)
						: Markup.button.callback('1', `{"zwiftRiderId":${results.zwiftRiderId}, "points":1}`),
				],
			]),
		};
	} catch (error) {
		console.log(error);
	}
}
