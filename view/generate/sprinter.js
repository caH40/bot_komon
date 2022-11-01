export function generateView(sprinters) {
	try {
		let body = '';
		sprinters.forEach(sprinter => {
			const teamStr = sprinter.team ? `(${sprinter.team})` : '';
			body = `${body}${sprinter.place}. ${sprinter.name}${teamStr} -	<u>${sprinter.pointsSprint}</u>\n`;
		});
		return `${body}`;
	} catch (error) {
		console.log(error);
	}
}
