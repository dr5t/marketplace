import { Router } from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate as any);

router.get('/', getCart as any);
router.post('/', addToCart as any);
router.delete('/:itemId', removeFromCart as any);

export default router;
