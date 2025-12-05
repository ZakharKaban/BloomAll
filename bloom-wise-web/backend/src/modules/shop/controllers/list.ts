import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Plant } from '../../db/entities/Plant';

export async function listPlants(req: Request, res: Response) {
  try {
    const { search, careLevel, lightRequirement, petSafe } = req.query;
    const plantRepository = AppDataSource.getRepository(Plant);

    const queryBuilder = plantRepository.createQueryBuilder('plant');

    if (search) {
      queryBuilder.where('plant.name ILIKE :search', { search: `%${search}%` });
    }

    if (careLevel) {
      queryBuilder.andWhere('plant.careLevel = :careLevel', { careLevel });
    }

    if (lightRequirement) {
      queryBuilder.andWhere('plant.lightRequirement = :lightRequirement', { lightRequirement });
    }

    if (petSafe !== undefined) {
      queryBuilder.andWhere('plant.petSafe = :petSafe', { petSafe: petSafe === 'true' });
    }

    queryBuilder.andWhere('plant.inStock = :inStock', { inStock: true });

    const plants = await queryBuilder.getMany();

    res.json(plants);
  } catch (error) {
    console.error('List plants error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

