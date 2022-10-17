export function convertDate(date) {
	try {
		const dateArr = date.split('.');
		const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');

		const dateMilliseconds = new Date(dateNewFormat).getTime();

		return dateMilliseconds;
	} catch (error) {
		console.log(error);
	}
}
