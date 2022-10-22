import { Scenes } from 'telegraf';

import { downloadProtocolBase } from '../scenes/protocol/download.js';
import { uploadProtocolBase } from '../scenes/protocol/upload.js';
import { confirmUploadProtocolScene } from '../scenes/protocol/confirm.js';
import { downloadScheduleBase } from '../scenes/schedule/download.js';
import { uploadScheduleBase } from '../scenes/schedule/upload.js';
import { confirmUploadScheduleScene } from '../scenes/schedule/confirm.js';
import {
	firstSceneReg,
	secondSceneReg,
	thirdSceneReg,
	fourthSceneReg,
	fifthSceneReg,
	sixthSceneReg,
	seventhSceneReg,
	eighthSceneReg,
} from '../scenes/registration/registration.js';
import { firstSceneCreateTeam, secondSceneCreateTeam } from './team_create/team-create.js';

export function activationScenes() {
	try {
		return new Scenes.Stage([
			downloadProtocolBase(),
			uploadProtocolBase(),
			confirmUploadProtocolScene(),
			downloadScheduleBase(),
			uploadScheduleBase(),
			confirmUploadScheduleScene(),
			firstSceneReg(),
			secondSceneReg(),
			thirdSceneReg(),
			fourthSceneReg(),
			fifthSceneReg(),
			sixthSceneReg(),
			seventhSceneReg(),
			eighthSceneReg(),
			firstSceneCreateTeam(),
			secondSceneCreateTeam(),
		]);
	} catch (error) {
		console.log(error);
	}
}