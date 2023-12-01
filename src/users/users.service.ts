import { Injectable } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class usersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<Users | null> {
    console.log('email', email);
    // return this.usersRepository.findOne({
    //   where: {
    //     email,
    //   },
    // });
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async createOne(
    name: string,
    surname: string,
    email: string,
    password: string,
  ): Promise<any> {
    try {
      const res = this.usersRepository.insert({
        firstName: name,
        lastName: surname,
        email,
        password,
      });
      if (res) return true;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
