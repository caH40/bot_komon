// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const personSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	age: { type: Number },
});

export const Person = model('Person', personSchema);
