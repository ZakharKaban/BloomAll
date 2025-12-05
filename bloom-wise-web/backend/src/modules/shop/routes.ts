import { Router } from 'express';
import { listPlants } from './controllers/list';
import { getPlant } from './controllers/get';

const router = Router();

router.get('/plants', listPlants);
router.get('/plants/:id', getPlant);

export default router;

