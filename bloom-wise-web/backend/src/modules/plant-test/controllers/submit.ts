import { Response } from 'express';
import { AppDataSource } from '../../db';
import { Plant } from '../../db/entities/Plant';
import { PlantTestResult } from '../../db/entities/PlantTestResult';
import { AuthRequest } from '../../../common/types';

interface PlantScore {
  plant: Plant;
  score: number;
}

export async function submitTest(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Answers are required' });
    }

    const plantRepository = AppDataSource.getRepository(Plant);
    const allPlants = await plantRepository.find({
      where: { inStock: true },
    });

    // Calculate scores for all plants
    const plantScores: PlantScore[] = allPlants.map(plant => ({
      plant,
      score: calculateMatchScore(answers, plant),
    }));

    // Filter out plants that don't match critical requirements
    let filteredPlants = plantScores.filter(({ plant }) => {
      // Exclude plants with pollen if user has allergy
      if (answers[9] === 'definitely_yes' || answers[9] === 'probably_yes') {
        if (plant.hasPollen) return false;
      }

      // Exclude non-pet-safe plants if user needs safe plants
      if (answers[8] === 'yes_safe' && !plant.petSafe) {
        return false;
      }

      // Exclude flowering plants if user doesn't want flowering
      if (answers[10] === 'definitely_no') {
        if (plant.flowering) return false;
      }

      return true;
    });

    // Sort by score (highest first)
    filteredPlants.sort((a, b) => b.score - a.score);

    // Get top recommendations
    const topPlant = filteredPlants[0]?.plant;
    const additionalPlants = filteredPlants
      .slice(1, 4)
      .map(({ plant }) => plant);

    // Save test result
    if (topPlant && req.userId) {
      const testResultRepository = AppDataSource.getRepository(PlantTestResult);
      
      // Delete previous results for this user
      await testResultRepository.delete({ userId: req.userId });
      
      const testResult = testResultRepository.create({
        userId: req.userId,
        plantId: topPlant.id,
        answers,
        score: filteredPlants[0].score,
      });
      await testResultRepository.save(testResult);
    }

    res.json({
      topPlant: topPlant || null,
      additionalPlants: additionalPlants || [],
      message: 'Test completed successfully',
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateMatchScore(answers: Record<number, string>, plant: Plant): number {
  let score = 0;

  // Experience level (question id: 1)
  if (plant.experienceLevel && answers[1]) {
    if (answers[1] === 'beginner' && plant.experienceLevel === 'beginner') score += 5;
    else if (answers[1] === 'intermediate' && plant.experienceLevel === 'intermediate') score += 5;
    else if (answers[1] === 'expert' && plant.experienceLevel === 'expert') score += 5;
    else if (answers[1] === 'beginner' && plant.experienceLevel === 'intermediate') score += 3;
    else if (answers[1] === 'intermediate' && plant.experienceLevel === 'expert') score += 3;
    else score += 1;
  }

  // Care time (question id: 2) -> careLevel
  if (plant.careLevel && answers[2]) {
    const careMap: Record<string, string> = {
      'low': 'easy',
      'medium': 'medium',
      'high': 'hard',
    };
    const expectedLevel = careMap[answers[2] as string];
    if (plant.careLevel === expectedLevel) score += 5;
    else score += 2;
  }

  // Watering frequency (question id: 3)
  if (plant.wateringFrequency && answers[3]) {
    if (plant.wateringFrequency === answers[3]) score += 5;
    else score += 2;
  }

  // Light requirement (question id: 4)
  if (plant.lightRequirement && answers[4]) {
    if (plant.lightRequirement === answers[4]) score += 5;
    else score += 2;
  }

  // Temperature (question id: 5)
  if (plant.temperatureRange && answers[5]) {
    if (plant.temperatureRange === answers[5]) score += 5;
    else {
      // Partial matches
      const tempOrder = ['cold', 'moderate', 'warm', 'hot'];
      const plantIndex = tempOrder.indexOf(plant.temperatureRange);
      const answerIndex = tempOrder.indexOf(answers[5] as string);
      if (plantIndex >= 0 && answerIndex >= 0) {
        const diff = Math.abs(plantIndex - answerIndex);
        if (diff === 1) score += 3;
        else score += 1;
      }
    }
  }

  // Space requirement (question id: 6)
  if (plant.spaceRequirement && answers[6]) {
    if (plant.spaceRequirement === answers[6]) score += 5;
    else score += 2;
  }

  // Plant type (question id: 7)
  if (plant.plantType && answers[7]) {
    if (plant.plantType === answers[7]) score += 5;
    else score += 1;
  }

  // Pet safety (question id: 8)
  if (answers[8]) {
    if (answers[8] === 'yes_safe') {
      if (plant.petSafe) score += 5;
      else score -= 10; // Strong penalty
    } else if (answers[8] === 'no' || answers[8] === 'yes_accessible') {
      score += 2; // Neutral
    }
  }

  // Pollen allergy (question id: 9)
  if (answers[9]) {
    if (answers[9] === 'definitely_yes' || answers[9] === 'probably_yes') {
      if (!plant.hasPollen) score += 5;
      else score -= 10; // Strong penalty
    } else {
      score += 2; // Neutral
    }
  }

  // Flowering preference (question id: 10)
  if (answers[10]) {
    if (answers[10] === 'definitely_yes' || answers[10] === 'probably_yes') {
      if (plant.flowering) score += 5;
      else score += 1;
    } else if (answers[10] === 'definitely_no') {
      if (!plant.flowering) score += 5;
      else score -= 5;
    } else {
      score += 2; // Neutral
    }
  }

  // Fragrance preference (question id: 11)
  if (answers[11]) {
    if (answers[11] === 'definitely_yes' || answers[11] === 'probably_yes') {
      if (plant.hasFragrance) score += 4;
      else score += 1;
    } else if (answers[11] === 'definitely_no') {
      if (!plant.hasFragrance) score += 4;
      else score += 1;
    } else {
      score += 2; // Neutral
    }
  }

  // Fertilizer needs (question id: 12)
  if (plant.fertilizerNeeds && answers[12]) {
    if (plant.fertilizerNeeds === answers[12]) score += 4;
    else {
      const fertOrder = ['none', 'low', 'medium', 'high'];
      const plantIndex = fertOrder.indexOf(plant.fertilizerNeeds);
      const answerIndex = fertOrder.indexOf(answers[12] as string);
      if (plantIndex >= 0 && answerIndex >= 0) {
        const diff = Math.abs(plantIndex - answerIndex);
        if (diff === 1) score += 2;
        else score += 1;
      }
    }
  }

  return Math.max(0, score); // Ensure non-negative
}

export async function getTestResult(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const testResultRepository = AppDataSource.getRepository(PlantTestResult);
    const plantRepository = AppDataSource.getRepository(Plant);

    const testResult = await testResultRepository.findOne({
      where: { userId: req.userId },
      order: { createdAt: 'DESC' },
    });

    if (!testResult) {
      return res.status(404).json({ error: 'No test result found' });
    }

    const topPlant = await plantRepository.findOne({
      where: { id: testResult.plantId },
    });

    if (!topPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    // Recalculate additional plants based on saved answers
    const allPlants = await plantRepository.find({
      where: { inStock: true },
    });

    const plantScores = allPlants
      .filter(p => p.id !== topPlant.id)
      .map(plant => ({
        plant,
        score: calculateMatchScore(testResult.answers as Record<number, string>, plant),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ plant }) => plant);

    res.json({
      topPlant,
      additionalPlants: plantScores,
      answers: testResult.answers,
      score: testResult.score,
      createdAt: testResult.createdAt,
    });
  } catch (error) {
    console.error('Get test result error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
