import { teamForApprovalKeyboard, teamKeyboard } from '../../keyboard/keyboard.js';
import { Team } from '../../Model/Team.js';

export async function requestTeam(ctx) {
	try {
		const teamsDB = await Team.find({ isAllowed: false }).populate('capitan');
		if (teamsDB.length === 0) return await ctx.reply('Нет заявок на создание команды.');

		teamsDB.forEach(async team => {
			let title = `
Команда: "${team.name}";
Капитан: ${team.capitan.lastName} ${team.capitan.firstName};
Описание: ${team.description};

`;
			await ctx
				.reply(`${title}`, teamForApprovalKeyboard(team._id))
				.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
		});

		return;
	} catch (error) {
		console.log(error);
	}
}
export async function approvalTeam(ctx, cbqData) {
	try {
		const action = cbqData.slice(13, 14);
		const teamId = cbqData.slice(15);

		const teamDB = await Team.findOne({ _id: teamId }).populate('capitan');
		console.log(teamDB);
		if (action === 'Y') await Team.findOneAndUpdate({ _id: teamId }, { $set: { isAllowed: true } });
		if (action === 'N') await Team.findOneAndDelete({ _id: teamId });

		const time = new Date().toLocaleString();
		const title =
			action === 'Y'
				? `Создание команды "${teamDB.name}" одобрено! ${time}`
				: `Создание команды "${teamDB.name}" отклонено! ${time}`;
		console.log(title);

		await ctx.telegram.sendMessage(teamDB.capitan.telegramId, title);
		return await ctx
			.reply(title)
			.then(message => ctx.session.data.messagesIdForDelete.push(message.message_id));
	} catch (error) {
		console.log(error);
	}
}
