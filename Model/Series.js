import pkg from 'mongoose';
const { Schema, model } = pkg;

const seriesSchema = new Schema({
	name: String,
	dateStart: Number,
	description: String,
	type: String,
	organizer: String,
	schedule: { type: String, unique: true },
});

export const Series = model('Series', seriesSchema);
