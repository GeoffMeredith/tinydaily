import mongoose, { Document } from 'mongoose';
import { IUser } from '../types';

const userSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	subscribed: {
		type: Boolean,
		default: true
	},
	subscriptionDate: {
		type: Date,
		default: Date.now
	},
	preferredEmailHour: {
		type: Number,
		required: true,
		min: 0,
		max: 23
	},
	verified: {
		type: Boolean,
		default: false
	},
	verificationToken: {
		type: String,
		required: false
	}
});

export const User = mongoose.model<IUser>('User', userSchema); 