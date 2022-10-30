export function divisionChart(data) {
	try {
		const newData = [];
		const quantityPath = Math.trunc(data.length / 32);
		let j = 0;
		let k = 32;
		for (let i = 0; i < quantityPath + 1; i++) {
			newData.push(data.slice(j, k));
			j += 32;
			k += 32;
		}

		return newData;
	} catch (error) {
		console.log(error);
	}
}
