import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Musics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}
