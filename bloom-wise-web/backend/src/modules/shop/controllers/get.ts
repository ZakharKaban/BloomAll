import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Plant } from '../../db/entities/Plant';

export async function getPlant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const plantRepository = AppDataSource.getRepository(Plant);

    const plant = await plantRepository.findOne({ where: { id } });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json(plant);
  } catch (error) {
    console.error('Get plant error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

