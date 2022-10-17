export function convertDate(date, time = '00:00') {
	try {
		console.log(date, time);
		const millisecondsInHour = 3600000;
		const millisecondsInMinute = 60000;

		const timeArr = time.split(':');
		const timeMilliseconds = timeArr[0] * millisecondsInHour + timeArr[1] * millisecondsInMinute;

		const dateArr = date.split('.');
		const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');

		const dateMilliseconds = new Date(dateNewFormat).getTime() + timeMilliseconds;

		return dateMilliseconds;
	} catch (error) {
		console.log(error);
	}
}
