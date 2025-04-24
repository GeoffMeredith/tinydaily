import { Request, Response } from 'express';
import { Saying } from '../models/Saying';
import { User } from '../models/User';
import {
	ISaying,
	IUser,
	SubscriptionRequest,
	SubscriptionResponse
} from '../types';

export const getDailySaying = async (req: Request, res: Response): Promise<void> => {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const saying: ISaying | null = await Saying.findOne({
			date: {
				$gte: today,
				$lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
			}
		});

		res.render('index', {
			title: 'Daily Inspiration',
			saying: saying || null
		});
	} catch (error) {
		console.error('Error fetching saying:', error);
		res.render('index', {
			title: 'Daily Inspiration',
			saying: null
		});
	}
};
