import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { usersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private userService: usersService,
    private jwtService: JwtService,
  ) {}

  // Авторизация пользователя
  async signIn(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      id: user.id,
      email: user.email,
    };
  }
  // Регистрация пользователя
  async signUp(name: string, surname: string, email: string, password: string) {
    const isUserExist = await this.userService.findOne(email);
    if (isUserExist) {
      throw new ConflictException(
        `user with email:${isUserExist.email} is already exsist`,
      );
    }
    await this.userService.createOne(name, surname, email, password);
  }
}
