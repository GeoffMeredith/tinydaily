import express from 'express';
import { getDailySaying } from '../controllers/home.controller';

const router = express.Router();

router.get('/', getDailySaying);

export default router; 