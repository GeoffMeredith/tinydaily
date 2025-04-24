import { Router, Request, Response } from 'express';
import { subscribe, unsubscribe, getSubscription, updateSubscription, verifyEmail } from '../controllers/subscription.controller';

const router = Router();

// Subscribe to daily sayings
router.post('/', async (req: Request, res: Response) => {
    await subscribe(req, res);
});

// Verify email
router.get('/verify-email', async (req: Request, res: Response) => {
    await verifyEmail(req, res);
});

// Unsubscribe from daily sayings
router.post('/remove', async (req: Request, res: Response) => {
    await unsubscribe(req, res);
});

// Get subscription details
router.get('/:email', async (req: Request, res: Response) => {
    await getSubscription(req, res);
});

// Update subscription preferences
router.post('/update', async (req: Request, res: Response) => {
    await updateSubscription(req, res);
});

export default router; 