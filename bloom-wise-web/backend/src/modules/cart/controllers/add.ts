import { Response } from 'express';
import { AppDataSource } from '../../db';
import { CartItem } from '../../db/entities/CartItem';
import { Plant } from '../../db/entities/Plant';
import { AuthRequest } from '../../../common/types';

export async function addToCart(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { plantId, quantity = 1 } = req.body;

    if (!plantId) {
      return res.status(400).json({ error: 'Plant ID is required' });
    }

    const plantRepository = AppDataSource.getRepository(Plant);
    const plant = await plantRepository.findOne({ where: { id: plantId } });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const cartRepository = AppDataSource.getRepository(CartItem);
    
    // Check if item already exists in cart
    let cartItem = await cartRepository.findOne({
      where: { userId: req.userId, plantId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartRepository.save(cartItem);
    } else {
      cartItem = cartRepository.create({
        userId: req.userId,
        plantId,
        quantity,
      });
      await cartRepository.save(cartItem);
    }

    const updatedCartItem = await cartRepository.findOne({
      where: { id: cartItem.id },
      relations: ['plant'],
    });

    res.json(updatedCartItem);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateCartItem(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const cartRepository = AppDataSource.getRepository(CartItem);
    const cartItem = await cartRepository.findOne({
      where: { id, userId: req.userId },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartRepository.save(cartItem);

    const updatedCartItem = await cartRepository.findOne({
      where: { id: cartItem.id },
      relations: ['plant'],
    });

    res.json(updatedCartItem);
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function removeFromCart(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const cartRepository = AppDataSource.getRepository(CartItem);

    const cartItem = await cartRepository.findOne({
      where: { id, userId: req.userId },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartRepository.remove(cartItem);

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
