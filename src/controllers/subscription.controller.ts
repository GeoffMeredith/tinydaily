import { Request, Response } from 'express';
import { User } from '../models/User';
import { IUser, SubscriptionRequest, SubscriptionResponse } from '../types';
import { generateVerificationToken, sendVerificationEmail } from '../services/email.service';


export const subscribe = async (
	req: Request<{}, SubscriptionResponse, SubscriptionRequest>,
	res: Response<SubscriptionResponse>
): Promise<void> => {
	try {
		const { email, preferredEmailHour } = req.body;

		if (!email || typeof email !== 'string') {
			res.status(400).json({
				message: 'Invalid email format',
				data: { email, subscribed: false }
			});
			return;
		}

		if (!preferredEmailHour || typeof preferredEmailHour !== 'string') {
			res.status(400).json({
				message: 'Invalid preferred email hour',
				data: { email, subscribed: false }
			});
			return;
		}

		const existingUser: IUser | null = await User.findOne({ email });
		if (existingUser) {
			res.status(400).json({
				message: 'Email already subscribed',
				data: { email, subscribed: existingUser.subscribed }
			});
			return;
		}

		const verificationToken = generateVerificationToken();
		const newUser: IUser = await User.create({ 
			email, 
			preferredEmailHour,
			verificationToken,
			verified: false
		});

		await sendVerificationEmail(email, verificationToken);

		res.status(201).json({
			message: 'Please check your email to verify your subscription!',
			data: { email: newUser.email, subscribed: false }
		});
	} catch (error) {
		console.error('Error subscribing:', error);
		res.status(500).json({
			message: 'Error processing subscription',
			data: { email: req.body.email, subscribed: false }
		});
	}
};

export const getSubscription = async (req: Request, res: Response) => {
	const { email } = req.params;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: 'Subscription not found.'
			});
		}

		res.json({
			message: 'Subscription found.',
			data: {
				email: user.email,
				subscribed: user.subscribed,
				preferredEmailHour: user.preferredEmailHour
			}
		});
	} catch (error) {
		console.error('Error fetching subscription:', error);
		res.status(500).json({
			message: 'An error occurred while fetching your subscription.'
		});
	}
};

export const updateSubscription = async (req: Request, res: Response) => {
	const { email, preferredEmailHour } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: 'Subscription not found.'
			});
		}

		user.preferredEmailHour = preferredEmailHour;
		await user.save();

		res.json({
			message: 'Subscription preferences updated successfully.',
			data: {
				email: user.email,
				preferredEmailHour: user.preferredEmailHour
			}
		});
	} catch (error) {
		console.error('Error updating subscription:', error);
		res.status(500).json({
			message: 'An error occurred while updating your subscription.'
		});
	}
};

export const unsubscribe = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'Email not found in our records.' });
		}

		user.subscribed = false;
		await user.save();

		res.json({ message: 'Successfully unsubscribed!' });
	} catch (error) {
		console.error('Unsubscription error:', error);
		res.status(500).json({
			message: 'An error occurred while processing your unsubscription.'
		});
	}
};

export const verifyEmail = async (req: Request, res: Response) => {
	const { token } = req.query;

	try {
		const user = await User.findOne({ verificationToken: token });
		if (!user) {
			return res.status(400).json({
				message: 'Invalid verification token'
			});
		}

		user.verified = true;
		user.verificationToken = undefined;
		await user.save();

		res.json({
			message: 'Email verified successfully! You are now subscribed to TinyDaily.',
			data: {
				email: user.email,
				subscribed: true
			}
		});
	} catch (error) {
		console.error('Error verifying email:', error);
		res.status(500).json({
			message: 'Error verifying email'
		});
	}
}; 