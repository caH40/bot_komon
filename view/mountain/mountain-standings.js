import { Rider } from '../../Model/Rider.js';
import { Series } from '../../Model/Series.js';
import { getResultsSeries } from '../../modules/getResults.js';
import { posting } from './posting.js';

export async function resultsMountain(ctx, cbqData) {
	try {
		const seriesId = cbqData.slice(13);

		const seriesDB = await Series.findOne({ _id: seriesId });

		const results = await getResultsSeries(seriesId);

		let mountainResult = [];
		results.forEach(result => {
			if (result.pointsMountain === 0) return;

			const mountain = mountainResult.find(
				mountain => mountain?.riderId.toString() === result.riderId.toString()
			);

			if (mountain) return (mountain.pointsMountain += result.pointsMountain);

			mountainResult.push({ riderId: result.riderId, pointsMountain: result.pointsMountain });
		});

		for (let i = 0; i < mountainResult.length; i++) {
			let riderDB = await Rider.findOne({ _id: mountainResult[i].riderId }).populate({
				path: 'teamId',
				select: 'name',
			});
			mountainResult[i].name = `${riderDB.lastName} ${riderDB.firstName}`;
			mountainResult[i].team = riderDB.teamId.name;
			mountainResult[i].series = riderDB.teamId.name;
		}
		mountainResult = mountainResult.sort((a, b) => b.pointsMountain - a.pointsMountain);
		mountainResult.forEach((mountain, index) => (mountain.place = index + 1));

		return posting(ctx, mountainResult, seriesDB.name);
	} catch (error) {
		console.log(error);
	}
}
