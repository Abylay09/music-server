import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musics } from './entities/music.entity';
import { musicService } from './music.service';
import { musicController } from './music.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Musics])],
  controllers: [musicController],
  providers: [musicService],
})
export class musicModule {}
