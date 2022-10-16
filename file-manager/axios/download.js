import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export async function downloadXlsx(name, pathTelegram) {
	try {
		const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${pathTelegram}`;

		const pathSrc = path.resolve(__dirname, 'src/', name);

		const writeStream = fs.createWriteStream(pathSrc);

		const resAxios = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		});

		resAxios.data.pipe(writeStream);

		writeStream.on('finish', finish => console.log(finish));
		writeStream.on('error', error => console.log(error));
	} catch (error) {
		console.log(error);
	}
}
