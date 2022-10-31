import pkg from 'mongoose';
const { Schema, model } = pkg;

const clickSchema = new Schema({
	user: { type: Object, unique: true, required: true },
	dateStart: Number,
	quantityClick: { type: Number, default: 0 },
});

export const Click = model('Click', clickSchema);
