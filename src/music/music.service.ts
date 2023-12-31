import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musics } from './entities/music.entity';
@Injectable()
export class musicService {
  constructor(
    @InjectRepository(Musics)
    private musicRepository: Repository<Musics>,
  ) {}
  getTop(): any {
    return [];
  }
  getSingleMusic(filename: string): any {
    const filePath = path.join(process.cwd(), 'music', filename);
    return filePath;
  }
  addMusic(name: string): any {
    this.musicRepository.insert({
      name,
    });
  }
}
