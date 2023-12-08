import { Injectable } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class usersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jswService: JwtService,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findByToken(jwtToken: string): Promise<any> {
    try {
      const decodedToken = this.jswService.decode(jwtToken);
      // const validated = this.jswService.verify(decodedToken, {
      //   publicKey: process.env.JWT_SECRET,
      // });
      const user = await this.findOne(decodedToken.email);
      return user;
      // const user = await this.usersRepository.findOne(decodedToken.sub);
      // return user;
    } catch (error) {
      // Обработайте ошибку, если токен не может быть раскодирован или пользователь не найден
      return undefined;
    }
  }

  findOne(email: string): Promise<Users | null> {
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

  async findOneById(id: number): Promise<any> {
    const options = {
      where: { id: id },
    };

    return await this.usersRepository.findOne(options);
  }

  async update(id: number, updateUser: any): Promise<any> {
    await this.usersRepository.update(id, updateUser);
    return await this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
