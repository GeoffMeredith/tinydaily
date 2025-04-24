import express from 'express';
import { getAddSayings, postAddSayings, getSayings, deleteSaying } from '../controllers/sayings.controller';

const router = express.Router();

router.get('/', getSayings);
router.get('/add', getAddSayings);
router.post('/add', postAddSayings);
router.delete('/:id', deleteSaying);

export default router; 