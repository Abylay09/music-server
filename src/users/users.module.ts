import { Module } from '@nestjs/common';
import { usersService } from './users.service';
import { usersController } from './users.controller';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [usersController],
  providers: [usersService],
  exports: [usersService],
})
export class usersModule {}
