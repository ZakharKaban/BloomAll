import { Response } from 'express';
import { AppDataSource } from '../../db';
import { Favorite } from '../../db/entities/Favorite';
import { Plant } from '../../db/entities/Plant';
import { AuthRequest } from '../../../common/types';

export async function getFavorites(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const favoriteRepository = AppDataSource.getRepository(Favorite);
    const favorites = await favoriteRepository.find({
      where: { userId: req.userId },
      relations: ['plant'],
    });

    res.json(favorites.map(fav => fav.plant));
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function addFavorite(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { plantId } = req.params;

    if (!plantId) {
      return res.status(400).json({ error: 'Plant ID is required' });
    }

    const plantRepository = AppDataSource.getRepository(Plant);
    const plant = await plantRepository.findOne({ where: { id: plantId } });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const favoriteRepository = AppDataSource.getRepository(Favorite);
    
    // Check if already favorited
    const existing = await favoriteRepository.findOne({
      where: { userId: req.userId, plantId },
    });

    if (existing) {
      return res.json({ message: 'Already in favorites', plant });
    }

    const favorite = favoriteRepository.create({
      userId: req.userId,
      plantId,
    });

    await favoriteRepository.save(favorite);

    res.json({ message: 'Added to favorites', plant });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function removeFavorite(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { plantId } = req.params;
    const favoriteRepository = AppDataSource.getRepository(Favorite);

    const favorite = await favoriteRepository.findOne({
      where: { userId: req.userId, plantId },
    });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    await favoriteRepository.remove(favorite);

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

