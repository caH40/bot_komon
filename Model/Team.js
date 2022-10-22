import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const teamSchema = new Schema({
	name: { type: String, unique: true },
	capitan: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true },
	description: String,
	groupName: String,
	link: String,
	isAllowed: { type: Boolean, default: false },
	requestRiders: [Number],
});

export const Team = model('Team', teamSchema);
