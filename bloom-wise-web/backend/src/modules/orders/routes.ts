import { Router } from 'express';
import { authenticateToken } from '../../common/middleware/auth';
import { getOrders, getOrder, createOrder } from './controllers/index';

const router = Router();

router.use(authenticateToken);

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

export default router;

