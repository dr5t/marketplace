import { Router } from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);

export default router;
