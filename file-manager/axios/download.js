import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';

export async function downloadXlsx(path, name) {
	try {
		const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${path}`;
		const writer = fs.createWriteStream(`../../src/${name}.xlsx`);

		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		});

		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
	} catch (error) {
		console.log(error);
	}
}
