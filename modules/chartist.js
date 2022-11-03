import { Click } from '../Model/Click.js';

export async function getCharts(ctx) {
	try {
		// let clicksDB = await Click.find();

		let clicksDB = await Click.aggregate([
			{
				$group: {
					_id: null,
					totalAmount: { $sum: '$quantityClick' },
					count: { $sum: 1 },
				},
			},
		]);
		console.log(clicksDB);
	} catch (error) {
		console.log(error);
	}
}
