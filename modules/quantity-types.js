export async function getTypes(stages) {
	try {
		const types = [
			{ type: 'TT', quantity: 0 },
			{ type: 'mountain', quantity: 0 },
			{ type: 'mixed', quantity: 0 },
		];

		stages.forEach(stage => {
			types.forEach(type => {
				console.log('stage.type', stage.type, 'type.type', type.type);
				console.log(stage.type === type.type);
				if (stage.type === type.type) type.quantity++;
			});
		});

		return types;
	} catch (error) {
		console.log(error);
	}
}
