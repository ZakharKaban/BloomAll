import { Router } from 'express';
import { authenticateToken } from '../../common/middleware/auth';
import { getCart } from './controllers/get';
import { addToCart, updateCartItem, removeFromCart } from './controllers/add';

const router = Router();

router.use(authenticateToken);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeFromCart);

export default router;

