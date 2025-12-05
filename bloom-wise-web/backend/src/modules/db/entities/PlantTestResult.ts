import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Plant } from './Plant';

@Entity('plant_test_results')
export class PlantTestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  plantId: string;

  @Column('jsonb', { nullable: true })
  answers: Record<string, string>;

  @Column({ default: 0 })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.testResults, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Plant)
  @JoinColumn({ name: 'plantId' })
  plant: Plant;
}

