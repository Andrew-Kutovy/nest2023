import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedUpdatedModel } from './common/created-updated.model';

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;
}
