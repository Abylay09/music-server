import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { favMusicService } from './favMusic.service';
import { favMusicController } from './favMusic.controller';
import { favMusic } from './entities/favourites.entity';
@Module({
  imports: [TypeOrmModule.forFeature([favMusic])],
  controllers: [favMusicController],
  providers: [favMusicService],
})
export class favMusicModule {}
