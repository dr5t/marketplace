import { Router } from 'express';
import { createPayment, verifyPayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate as any);

router.post('/create', createPayment as any);
router.post('/verify', verifyPayment as any);

export default router;
