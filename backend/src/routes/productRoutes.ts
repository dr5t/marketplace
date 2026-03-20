import { Router } from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.post('/', authenticate as any, authorizeRoles('SELLER', 'ADMIN') as any, createProduct as any);
router.get('/:id', getProductById);

export default router;
