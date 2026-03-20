import express from 'express';
import { getFeedbacks, createFeedback } from '../controllers/feedbackController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getFeedbacks);
router.post('/', authenticate as any, createFeedback as any);

export default router;
