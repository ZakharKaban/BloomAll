import { Router } from 'express';
import { getQuestions } from './controllers/questions';
import { submitTest, getTestResult } from './controllers/submit';
import { authenticateToken } from '../../common/middleware/auth';

const router = Router();

router.get('/questions', getQuestions);
router.post('/submit', authenticateToken, submitTest);
router.get('/result', authenticateToken, getTestResult);

export default router;

