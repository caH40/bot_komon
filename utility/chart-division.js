export function divisionChart(data) {
	try {
		const newData = [];
		const quantityPath = Math.trunc(data.length / 33);
		let j = 0;
		let k = 33;
		for (let i = 0; i < quantityPath + 1; i++) {
			newData.push(data.slice(j, k));
			j += 33;
			k += 33;
		}

		return newData;
	} catch (error) {
		console.log(error);
	}
}
