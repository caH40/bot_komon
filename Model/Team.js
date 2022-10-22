import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const riderSchema = new Schema({
	name: { type: String, unique: true },
	firstName: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
	description: String,
	isAllowed: { type: Boolean, default: false },
	requestRiders: Array,
});

export const Rider = model('Rider', riderSchema);
