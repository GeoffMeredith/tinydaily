import { Request, Response } from 'express';
import { Saying } from '../models/Saying';

export const getAddSayings = (req: Request, res: Response) => {
	res.render('sayings/add');
};

export const postAddSayings = async (req: Request, res: Response) => {
	const rawText = req.body.sayings;
	const sayings = rawText
		.split('\n')
		.map((line: string) => line.trim())
		.filter((line: string) => line.length > 0)
		.map((line: string) => line.replace(/^\d+\.\s*/, '')); // Remove leading numbers and periods

	try {
		// Check for existing sayings
		const existingSayings = await Saying.find({ text: { $in: sayings } });
		const existingTexts = new Set(existingSayings.map((s: { text: string }) => s.text));
		const uniqueNewSayings = sayings.filter((text: string) => !existingTexts.has(text));

		if (uniqueNewSayings.length === 0) {
			return res.redirect('/sayings');
		}

		// Get the latest saying date
		const latestSaying = await Saying.findOne().sort({ date: -1 });
		const latestDate = latestSaying?.date || new Date();
		
		// Add new sayings with future dates
		const newSayings = uniqueNewSayings.map((text: string, index: number) => {
			const date = new Date(latestDate);
			date.setDate(date.getDate() + index + 1);
			date.setHours(0, 0, 0, 0); // Set time to beginning of day
			return { text, date };
		});

		await Saying.insertMany(newSayings);

		// Check for gaps and fill them
		const allSayings = await Saying.find().sort({ date: 1 });
		const futureSayings = allSayings.filter(s => s.date > new Date());
		
		if (futureSayings.length > 0) {
			const gaps = [];
			for (let i = 0; i < futureSayings.length - 1; i++) {
				const currentDate = futureSayings[i].date;
				const nextDate = futureSayings[i + 1].date;
				const diffDays = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
				
				if (diffDays > 1) {
					gaps.push({
						date: new Date(currentDate),
						daysToNext: diffDays
					});
				}
			}

			// Fill gaps by moving the furthest future saying to the gap
			for (const gap of gaps) {
				const furthestSaying = await Saying.findOne().sort({ date: -1 });
				if (furthestSaying) {
					const newDate = new Date(gap.date);
					newDate.setDate(newDate.getDate() + 1);
					newDate.setHours(0, 0, 0, 0); // Set time to beginning of day
					await Saying.findByIdAndUpdate(furthestSaying._id, { date: newDate });
				}
			}
		}

		res.redirect('/sayings');
	} catch (error) {
		console.error('Error saving sayings:', error);
		res.redirect('/sayings/add');
	}
};

export const getSayings = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = 60;
		const skip = (page - 1) * limit;

		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
		sevenDaysAgo.setHours(0, 0, 0, 0);

		const [sayings, total] = await Promise.all([
			Saying.find({
				date: { $gte: sevenDaysAgo }
			})
				.sort({ date: 1 })
				.skip(skip)
				.limit(limit),
			Saying.countDocuments({ date: { $gte: sevenDaysAgo } })
		]);

		const totalPages = Math.ceil(total / limit);

		res.render('sayings/index', { 
			sayings,
			currentPage: page,
			totalPages,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
			today: new Date()
		});
	} catch (error) {
		console.error('Error fetching sayings:', error);
		res.render('sayings/index', { 
			sayings: [],
			currentPage: 1,
			totalPages: 1,
			hasNextPage: false,
			hasPreviousPage: false,
			today: new Date()
		});
	}
};

export const deleteSaying = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Saying.findByIdAndDelete(id);
		res.json({ success: true, message: 'Saying deleted successfully' });
	} catch (error) {
		console.error('Error deleting saying:', error);
		res.status(500).json({ success: false, message: 'Error deleting saying' });
	}
}; 