import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CartItem } from './CartItem';
import { Favorite } from './Favorite';
import { OrderItem } from './OrderItem';

@Entity('plants')
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  inStock: boolean;

  @Column({ nullable: true })
  careLevel: string; // 'easy', 'medium', 'hard'

  @Column({ nullable: true })
  lightRequirement: string; // 'low', 'medium', 'high'

  @Column({ nullable: true })
  petSafe: boolean;

  // Extended characteristics for advanced matching
  @Column({ nullable: true })
  wateringFrequency: string; // 'low', 'medium', 'high'

  @Column({ nullable: true })
  spaceRequirement: string; // 'small', 'medium', 'large'

  @Column({ default: false })
  flowering: boolean;

  @Column({ default: false })
  hasPollen: boolean;

  @Column({ default: false })
  hasFragrance: boolean;

  @Column({ nullable: true })
  fertilizerNeeds: string; // 'none', 'low', 'medium', 'high'

  @Column({ nullable: true })
  temperatureRange: string; // 'cold', 'moderate', 'warm', 'hot'

  @Column({ nullable: true })
  plantType: string; // 'tree', 'bush', 'flower', 'moss', 'vine', 'succulent', 'fern'

  @Column({ nullable: true })
  experienceLevel: string; // 'beginner', 'intermediate', 'expert'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.plant)
  cartItems: CartItem[];

  @OneToMany(() => Favorite, (favorite) => favorite.plant)
  favorites: Favorite[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.plant)
  orderItems: OrderItem[];
}

