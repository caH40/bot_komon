import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const resultSchema = new Schema({
	seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
	stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage' },
	riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
	placeAbsolute: Number,
	placeCategory: Number,
	wattPerKg: Number,
	watt: Number,
	time: Number,
	gap: String,
	categoryCurrent: String,
	teamCurrent: String,
	pointsStage: Number,
	pointsSprint: Number,
	pointsMountain: Number,
	isUnderChecking: { type: String, default: false },
});

export const Result = model('Result', resultSchema);
