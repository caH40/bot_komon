export function divisionChart(data) {
	try {
		const newData = [];
		const quantityPath = Math.trunc(data.length / 36);
		let j = 0;
		let k = 36;
		for (let i = 0; i < quantityPath + 1; i++) {
			newData.push(data.slice(j, k));
			j += 36;
			k += 36;
		}

		return newData;
	} catch (error) {
		console.log(error);
	}
}
