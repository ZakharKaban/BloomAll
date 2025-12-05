import { Response } from 'express';
import { AppDataSource } from '../../db';
import { Order, OrderStatus } from '../../db/entities/Order';
import { OrderItem } from '../../db/entities/OrderItem';
import { CartItem } from '../../db/entities/CartItem';
import { AuthRequest } from '../../../common/types';

export async function getOrders(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({
      where: { userId: req.userId },
      relations: ['items', 'items.plant'],
      order: { createdAt: 'DESC' },
    });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getOrder(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { id, userId: req.userId },
      relations: ['items', 'items.plant'],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createOrder(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { address, phone } = req.body;

    // Get user's cart
    const cartRepository = AppDataSource.getRepository(CartItem);
    const cartItems = await cartRepository.find({
      where: { userId: req.userId },
      relations: ['plant'],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.plant.price.toString()) * item.quantity;
    }, 0);

    // Create order
    const orderRepository = AppDataSource.getRepository(Order);
    const order = orderRepository.create({
      userId: req.userId,
      total,
      status: OrderStatus.PENDING,
      address,
      phone,
    });

    const savedOrder = await orderRepository.save(order);

    // Create order items
    const orderItemRepository = AppDataSource.getRepository(OrderItem);
    const orderItems = cartItems.map(item =>
      orderItemRepository.create({
        orderId: savedOrder.id,
        plantId: item.plantId,
        quantity: item.quantity,
        price: item.plant.price,
      })
    );

    await orderItemRepository.save(orderItems);

    // Clear cart
    await cartRepository.remove(cartItems);

    // Get order with relations
    const orderWithItems = await orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items', 'items.plant'],
    });

    res.status(201).json(orderWithItems);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

