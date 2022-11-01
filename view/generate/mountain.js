export function generateView(mountains) {
	try {
		let body = '';
		mountains.forEach(mountain => {
			const teamStr = mountain.team ? `(${mountain.team})` : '';
			body = `${body}${mountain.place}. ${mountain.name}${teamStr} -	<u>${mountain.pointsMountain}</u>\n`;
		});
		return `${body}`;
	} catch (error) {
		console.log(error);
	}
}
