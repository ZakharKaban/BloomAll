import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { User } from '../db/entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOne({ where: { email } });
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const userRepository = AppDataSource.getRepository(User);
  const hashedPassword = await hashPassword(password);
  
  const user = userRepository.create({
    email,
    password: hashedPassword,
    name,
  });

  return userRepository.save(user);
}

