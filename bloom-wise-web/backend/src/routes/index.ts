import { Router } from 'express';
import authRouter from '../modules/auth/routes';
import shopRouter from '../modules/shop/routes';
import cartRouter from '../modules/cart/routes';
import accountRouter from '../modules/account/routes';
import plantTestRouter from '../modules/plant-test/routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/shop', shopRouter);
router.use('/cart', cartRouter);
router.use('/account', accountRouter);
router.use('/plant-test', plantTestRouter);

export default router;
