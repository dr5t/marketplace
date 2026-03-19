import express from 'express';
import { getSiteConfig, updateSiteConfig } from '../controllers/adminController';
import { authenticate, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/config', getSiteConfig);
router.post('/config', authenticate, authorizeRoles('ADMIN'), updateSiteConfig);

export default router;
