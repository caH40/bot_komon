export function changeTitles(dataXlsx) {
	try {
		return dataXlsx.map(elm => {
			return {
				name: elm['Имя участника'],
				teamCurrent: elm['Команда'],
				time: elm['Время'],
				gap: elm['Отставание'],
				placeAbsolute: elm['Место общее'],
				placeCategory: elm['Место в группе'],
				pointsStage: elm['Очки'],
				category: elm['Группа'],
				categoryCurrent: elm['Группа обновленная'],
				wattPerKg: elm[`Вт\\кг`],
				watt: elm['Ватты'],
			};
		});
	} catch (error) {
		console.log(error);
	}
}
