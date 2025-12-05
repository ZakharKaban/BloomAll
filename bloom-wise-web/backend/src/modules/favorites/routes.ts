import { Router } from 'express';
import { authenticateToken } from '../../common/middleware/auth';
import { getFavorites, addFavorite, removeFavorite } from './controllers/index';

const router = Router();

router.use(authenticateToken);

router.get('/', getFavorites);
router.post('/:plantId', addFavorite);
router.delete('/:plantId', removeFavorite);

export default router;

