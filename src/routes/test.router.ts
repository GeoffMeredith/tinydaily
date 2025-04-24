import { Router, Request, Response } from 'express';
import { sendEmail } from '../utils/email';

const router = Router();

// Serve the test page
router.get('/', (req: Request, res: Response): void => {
	res.render('test');
});

// Send test email
router.post('/send-test-email', async (req: Request, res: Response): Promise<void> => {
	const { to, subject, message } = req.body;

	if (!to || !subject || !message) {
		res.status(400).json({
			success: false,
			message: 'Missing required fields: to, subject, message'
		});
		return;
	}

	const messageId = await sendEmail({ to, subject, message });
	if (!messageId) {
		res.status(500).json({
			success: false,
			message: 'Failed to send test email',
			error: 'Email not sent'
		});
	}

	res.json({
		success: true,
		message: 'Test email sent successfully',
		messageId
	});
});

export default router; 