import { Router } from 'express';
import authRouter from '../modules/auth/routes';
import shopRouter from '../modules/shop/routes';
import cartRouter from '../modules/cart/routes';
import accountRouter from '../modules/account/routes';
import plantTestRouter from '../modules/plant-test/routes';
import favoritesRouter from '../modules/favorites/routes';
import ordersRouter from '../modules/orders/routes';
import adminRouter from '../modules/admin/routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/shop', shopRouter);
router.use('/cart', cartRouter);
router.use('/account', accountRouter);
router.use('/plant-test', plantTestRouter);
router.use('/favorites', favoritesRouter);
router.use('/orders', ordersRouter);
router.use('/admin', adminRouter);

export default router;
