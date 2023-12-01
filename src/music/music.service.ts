import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musics } from './entities/music.entity';
import { log } from 'console';
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
  addMusic(name: string, posterurl: string): any {
    log(name, posterurl);
    this.musicRepository.insert({
      name,
      poster: posterurl,
    });
  }
}
