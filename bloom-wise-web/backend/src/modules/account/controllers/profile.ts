import { Response } from 'express';
import { AppDataSource } from '../../db';
import { User } from '../../db/entities/User';
import { AuthRequest } from '../../../common/types';
import { hashPassword } from '../../auth/service';

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser && existingUser.id !== req.userId) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      user.email = email;
    }

    if (password) {
      user.password = await hashPassword(password);
    }

    await userRepository.save(user);

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

