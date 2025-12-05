import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Plant } from './entities/Plant';
import { CartItem } from './entities/CartItem';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';
import { Favorite } from './entities/Favorite';
import { PlantTestResult } from './entities/PlantTestResult';
import { hashPassword } from '../auth/service';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/bloomwise';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: [User, Plant, CartItem, Order, OrderItem, Favorite, PlantTestResult],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in dev
  logging: process.env.NODE_ENV === 'development',
});

async function seedDatabase() {
  const userRepository = AppDataSource.getRepository(User);
  const plantRepository = AppDataSource.getRepository(Plant);
  
  // Create admin user if not exists
  const adminExists = await userRepository.findOne({ where: { email: 'admin@bloomwise.com' } });
  if (!adminExists) {
    const adminPassword = await hashPassword('admin123');
    const admin = userRepository.create({
      email: 'admin@bloomwise.com',
      password: adminPassword,
      name: 'Администратор',
      role: 'admin',
    });
    await userRepository.save(admin);
    console.log('Admin user created: admin@bloomwise.com / admin123');
  }
  
  // Get all existing plant names
  const existingPlants = await plantRepository.find({ select: ['name'] });
  const existingNames = new Set(existingPlants.map(p => p.name));
  
  const allPlants = [
      {
        name: 'Монстера',
        description: 'Красивое тропическое растение с большими резными листьями. Отлично подходит для декорирования интерьера и очищения воздуха. Неприхотливо в уходе и быстро растёт.',
        price: 1500,
        imageUrl: '/src/assets/plant-1.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'medium',
        petSafe: false,
        wateringFrequency: 'medium',
        spaceRequirement: 'large',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'low',
        temperatureRange: 'warm',
        plantType: 'vine',
        experienceLevel: 'beginner',
      },
      {
        name: 'Потос',
        description: 'Неприхотливое вьющееся растение с красивыми листьями. Идеально для начинающих садоводов.',
        price: 800,
        imageUrl: '/src/assets/plant-2.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'low',
        petSafe: false,
        wateringFrequency: 'low',
        spaceRequirement: 'medium',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'low',
        temperatureRange: 'moderate',
        plantType: 'vine',
        experienceLevel: 'beginner',
      },
      {
        name: 'Сансевиерия',
        description: 'Выносливое растение, которое может выжить практически в любых условиях. Отлично очищает воздух.',
        price: 1200,
        imageUrl: '/src/assets/plant-3.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'low',
        petSafe: false,
        wateringFrequency: 'low',
        spaceRequirement: 'small',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'none',
        temperatureRange: 'moderate',
        plantType: 'succulent',
        experienceLevel: 'beginner',
      },
      {
        name: 'Фикус',
        description: 'Популярное комнатное растение с глянцевыми листьями. Требует умеренного ухода.',
        price: 2000,
        imageUrl: '/src/assets/plant-1.png',
        inStock: true,
        careLevel: 'medium',
        lightRequirement: 'medium',
        petSafe: false,
        wateringFrequency: 'medium',
        spaceRequirement: 'large',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'medium',
        temperatureRange: 'warm',
        plantType: 'tree',
        experienceLevel: 'intermediate',
      },
      {
        name: 'Драцена',
        description: 'Элегантное растение с длинными листьями. Легко в уходе и отлично смотрится в интерьере.',
        price: 1800,
        imageUrl: '/src/assets/plant-2.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'medium',
        petSafe: false,
        wateringFrequency: 'low',
        spaceRequirement: 'medium',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'low',
        temperatureRange: 'moderate',
        plantType: 'tree',
        experienceLevel: 'beginner',
      },
      {
        name: 'Спатифиллум',
        description: 'Красивое цветущее растение, известное как "женское счастье". Неприхотливо и цветёт круглый год.',
        price: 900,
        imageUrl: '/src/assets/plant-3.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'low',
        petSafe: true,
        wateringFrequency: 'medium',
        spaceRequirement: 'medium',
        flowering: true,
        hasPollen: false,
        hasFragrance: true,
        fertilizerNeeds: 'medium',
        temperatureRange: 'warm',
        plantType: 'flower',
        experienceLevel: 'beginner',
      },
      {
        name: 'Алоэ Вера',
        description: 'Лечебное суккулентное растение с мясистыми листьями. Не требует частого полива и отлично подходит для начинающих.',
        price: 600,
        imageUrl: '/src/assets/plant-1.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'high',
        petSafe: false,
        wateringFrequency: 'low',
        spaceRequirement: 'small',
        flowering: true,
        hasPollen: true,
        hasFragrance: false,
        fertilizerNeeds: 'none',
        temperatureRange: 'warm',
        plantType: 'succulent',
        experienceLevel: 'beginner',
      },
      {
        name: 'Фикус Бенджамина',
        description: 'Элегантное дерево с мелкими листьями. Требует регулярного ухода и внимания.',
        price: 2500,
        imageUrl: '/src/assets/plant-2.png',
        inStock: true,
        careLevel: 'medium',
        lightRequirement: 'medium',
        petSafe: false,
        wateringFrequency: 'medium',
        spaceRequirement: 'large',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'medium',
        temperatureRange: 'warm',
        plantType: 'tree',
        experienceLevel: 'intermediate',
      },
      {
        name: 'Орхидея Фаленопсис',
        description: 'Красивое цветущее растение с экзотическими цветами. Требует особого ухода и условий.',
        price: 1800,
        imageUrl: '/src/assets/plant-3.png',
        inStock: true,
        careLevel: 'hard',
        lightRequirement: 'medium',
        petSafe: true,
        wateringFrequency: 'low',
        spaceRequirement: 'small',
        flowering: true,
        hasPollen: true,
        hasFragrance: true,
        fertilizerNeeds: 'high',
        temperatureRange: 'warm',
        plantType: 'flower',
        experienceLevel: 'expert',
      },
      {
        name: 'Папоротник Нефролепис',
        description: 'Пышный папоротник с ажурными листьями. Любит влажность и тень.',
        price: 1100,
        imageUrl: '/src/assets/plant-1.png',
        inStock: true,
        careLevel: 'medium',
        lightRequirement: 'low',
        petSafe: true,
        wateringFrequency: 'high',
        spaceRequirement: 'medium',
        flowering: false,
        hasPollen: false,
        hasFragrance: false,
        fertilizerNeeds: 'low',
        temperatureRange: 'moderate',
        plantType: 'fern',
        experienceLevel: 'intermediate',
      },
      {
        name: 'Кактус',
        description: 'Неприхотливое растение, идеальное для забывчивых. Практически не требует ухода.',
        price: 500,
        imageUrl: '/src/assets/plant-2.png',
        inStock: true,
        careLevel: 'easy',
        lightRequirement: 'high',
        petSafe: false,
        wateringFrequency: 'low',
        spaceRequirement: 'small',
        flowering: true,
        hasPollen: true,
        hasFragrance: false,
        fertilizerNeeds: 'none',
        temperatureRange: 'warm',
        plantType: 'succulent',
        experienceLevel: 'beginner',
      },
    ];

  // Filter out plants that already exist
  const newPlants = allPlants.filter(plant => !existingNames.has(plant.name));
  
  if (newPlants.length > 0) {
    await plantRepository.save(newPlants);
    console.log(`Database seeded with ${newPlants.length} new plants`);
  } else {
    console.log('All plants already exist in database');
  }
}

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
    
    // Seed initial data if needed
    await seedDatabase();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

