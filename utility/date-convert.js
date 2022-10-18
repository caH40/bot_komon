export function convertDate(date, time = '00:00') {
	try {
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
//строку в милисекунды
export function convertTime(time = '00:00') {
	try {
		const millisecondsInHour = 3600000;
		const millisecondsInMinute = 60000;

		const timeArr = time.split(':');
		if (timeArr.length === 3) {
			return (
				timeArr[0] * millisecondsInHour + timeArr[1] * millisecondsInMinute + timeArr[2] * 1000
			);
		}
		if (timeArr.length === 2) {
			return timeArr[0] * millisecondsInMinute + timeArr[1] * 1000;
		}
	} catch (error) {
		console.log(error);
	}
}
