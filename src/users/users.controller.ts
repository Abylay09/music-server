import { Controller, Get, Header } from '@nestjs/common';
import { usersService } from './users.service';

@Controller('users')
export class usersController {
  constructor(private usersServie: usersService) {}
  @Get('/user')
  @Header('ngrok-skip-browser-warning', 'dfgdfgf')
  async getUsers(): Promise<any> {
    const users = await this.usersServie.findAll();
    return { users };
  }
}
