import { Controller, Get, Headers, Put, Param, Body } from '@nestjs/common';
import { usersService } from './users.service';

@Controller('users')
export class usersController {
  constructor(private usersServie: usersService) {}
  @Get('/user')
  async getUsers(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<any> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return Promise.resolve(undefined);
    }
    // Извлечение токена из заголовка
    const jwtToken = authorizationHeader.slice(7);
    const user = await this.usersServie.findByToken(jwtToken);
    return { user };
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser): Promise<any> {
    return this.usersServie.update(+id, updateUser);
  }
}
