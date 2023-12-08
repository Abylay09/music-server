import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class favMusic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  musicId: number;
}
