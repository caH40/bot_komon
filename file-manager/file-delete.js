import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export function deleteFile(fileName) {
	try {
		const pathSrc = path.resolve(__dirname, 'src/', fileName);
		const response = fs.unlinkSync(pathSrc);
	} catch (error) {
		console.log(error);
	}
}
