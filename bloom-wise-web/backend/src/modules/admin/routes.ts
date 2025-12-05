import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../../common/middleware/auth';
import { createPlant, updatePlant, deletePlant, getAllPlants } from './controllers/plants';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/plants', getAllPlants);
router.post('/plants', createPlant);
router.put('/plants/:id', updatePlant);
router.delete('/plants/:id', deletePlant);

export default router;

