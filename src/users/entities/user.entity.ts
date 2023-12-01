import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  firstName: string;

  @Column({ nullable: false, length: 50 })
  lastName: string;

  @Column({ nullable: false, length: 80 })
  email: string;

  @Column({ nullable: false, length: 80 })
  password: string;
}
