import { Rider } from '../../Model/Rider.js';
import { Series } from '../../Model/Series.js';
import { getResultsSeries } from '../../modules/getResults.js';
import { posting } from './posting.js';

export async function resultsSprinter(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(13);

		const seriesDB = await Series.findOne({ _id: seriesId });

		const results = await getResultsSeries(seriesId);

		let sprintersResult = [];
		results.forEach(result => {
			if (result.pointsSprint === 0) return;
			const sprinter = sprintersResult.find(
				sprinter => sprinter?.riderId.toString() === result.riderId.toString()
			);

			if (sprinter) return (sprinter.pointsSprint = result.pointsSprint);

			sprintersResult.push({ riderId: result.riderId, pointsSprint: result.pointsSprint });
		});

		for (let i = 0; i < sprintersResult.length; i++) {
			let riderDB = await Rider.findOne({ _id: sprintersResult[i].riderId }).populate({
				path: 'teamId',
				select: 'name',
			});
			sprintersResult[i].name = `${riderDB.lastName} ${riderDB.firstName}`;
			sprintersResult[i].team = riderDB.teamId.name;
			sprintersResult[i].series = riderDB.teamId.name;
		}
		sprintersResult = sprintersResult.sort((a, b) => b.pointsSprint - a.pointsSprint);
		sprintersResult.forEach((sprinter, index) => (sprinter.place = index + 1));

		return posting(ctx, sprintersResult, seriesDB.name);
	} catch (error) {
		console.log(error);
	}
}
