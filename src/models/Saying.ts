import mongoose, { Document } from 'mongoose';
import { ISaying } from '../types';

const sayingSchema = new mongoose.Schema<ISaying>({
	text: {
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: String,
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

export const Saying = mongoose.model<ISaying>('Saying', sayingSchema); 