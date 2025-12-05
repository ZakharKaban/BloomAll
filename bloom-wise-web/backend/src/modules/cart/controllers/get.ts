import { Response } from 'express';
import { AppDataSource } from '../../db';
import { CartItem } from '../../db/entities/CartItem';
import { AuthRequest } from '../../../common/types';

export async function getCart(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const cartRepository = AppDataSource.getRepository(CartItem);
    const cartItems = await cartRepository.find({
      where: { userId: req.userId },
      relations: ['plant'],
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.plant.price.toString()) * item.quantity;
    }, 0);

    res.json({
      items: cartItems.map(item => ({
        id: item.id,
        plant: item.plant,
        quantity: item.quantity,
      })),
      total,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
