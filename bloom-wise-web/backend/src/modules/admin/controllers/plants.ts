import { Response } from 'express';
import { AppDataSource } from '../../db';
import { Plant } from '../../db/entities/Plant';
import { AuthRequest } from '../../../common/types';

export async function createPlant(req: AuthRequest, res: Response) {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      inStock,
      careLevel,
      lightRequirement,
      petSafe,
      wateringFrequency,
      spaceRequirement,
      flowering,
      hasPollen,
      hasFragrance,
      fertilizerNeeds,
      temperatureRange,
      plantType,
      experienceLevel,
    } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({ error: 'Name, description, and price are required' });
    }

    const plantRepository = AppDataSource.getRepository(Plant);
    const plant = plantRepository.create({
      name,
      description,
      price: parseFloat(price),
      imageUrl: imageUrl || null,
      inStock: inStock !== undefined ? inStock : true,
      careLevel: careLevel || null,
      lightRequirement: lightRequirement || null,
      petSafe: petSafe !== undefined ? petSafe : false,
      wateringFrequency: wateringFrequency || null,
      spaceRequirement: spaceRequirement || null,
      flowering: flowering !== undefined ? flowering : false,
      hasPollen: hasPollen !== undefined ? hasPollen : false,
      hasFragrance: hasFragrance !== undefined ? hasFragrance : false,
      fertilizerNeeds: fertilizerNeeds || null,
      temperatureRange: temperatureRange || null,
      plantType: plantType || null,
      experienceLevel: experienceLevel || null,
    });

    const savedPlant = await plantRepository.save(plant);
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error('Create plant error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updatePlant(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      imageUrl,
      inStock,
      careLevel,
      lightRequirement,
      petSafe,
      wateringFrequency,
      spaceRequirement,
      flowering,
      hasPollen,
      hasFragrance,
      fertilizerNeeds,
      temperatureRange,
      plantType,
      experienceLevel,
    } = req.body;

    const plantRepository = AppDataSource.getRepository(Plant);
    const plant = await plantRepository.findOne({ where: { id } });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    if (name !== undefined) plant.name = name;
    if (description !== undefined) plant.description = description;
    if (price !== undefined) plant.price = parseFloat(price);
    if (imageUrl !== undefined) plant.imageUrl = imageUrl;
    if (inStock !== undefined) plant.inStock = inStock;
    if (careLevel !== undefined) plant.careLevel = careLevel;
    if (lightRequirement !== undefined) plant.lightRequirement = lightRequirement;
    if (petSafe !== undefined) plant.petSafe = petSafe;
    if (wateringFrequency !== undefined) plant.wateringFrequency = wateringFrequency;
    if (spaceRequirement !== undefined) plant.spaceRequirement = spaceRequirement;
    if (flowering !== undefined) plant.flowering = flowering;
    if (hasPollen !== undefined) plant.hasPollen = hasPollen;
    if (hasFragrance !== undefined) plant.hasFragrance = hasFragrance;
    if (fertilizerNeeds !== undefined) plant.fertilizerNeeds = fertilizerNeeds;
    if (temperatureRange !== undefined) plant.temperatureRange = temperatureRange;
    if (plantType !== undefined) plant.plantType = plantType;
    if (experienceLevel !== undefined) plant.experienceLevel = experienceLevel;

    const updatedPlant = await plantRepository.save(plant);
    res.json(updatedPlant);
  } catch (error) {
    console.error('Update plant error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deletePlant(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const plantRepository = AppDataSource.getRepository(Plant);
    const plant = await plantRepository.findOne({ where: { id } });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    await plantRepository.remove(plant);
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error('Delete plant error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllPlants(req: AuthRequest, res: Response) {
  try {
    const plantRepository = AppDataSource.getRepository(Plant);
    const plants = await plantRepository.find({
      order: { createdAt: 'DESC' },
    });
    res.json(plants);
  } catch (error) {
    console.error('Get all plants error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

