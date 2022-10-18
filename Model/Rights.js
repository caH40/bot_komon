import pkg from 'mongoose';

const { Schema, model } = pkg;

const rightsSchema = new Schema({
	root: [Number],
	admin: [Number],
	moderator: [Number],
});

export const Rights = model('Rights', rightsSchema);
