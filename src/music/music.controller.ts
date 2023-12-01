import {
  Post,
  UseInterceptors,
  UploadedFile,
  Controller,
  HttpCode,
  Get,
  Query,
  Res,
  Header,
  UseGuards,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { musicService } from './music.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { join } from 'path';
import * as fs from 'fs';
import { log } from 'console';
@Controller('/music')
export class musicController {
  constructor(private musicService: musicService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'music',
        filename: (req, file, cb) => {
          log(file);
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @UploadedFile() image: Express.Multer.File,
    @Body() uploadBody: Record<string, any>,
  ) {
    try {
      this.musicService.addMusic(file.originalname, uploadBody.image);
      const response = {
        data: file.path,
        status: 'file uploaded',
      };
      return response;
    } catch (e) {
      log(uploadBody);
      throw new InternalServerErrorException('Database error');
    }
  }

  // @UseGuards(AuthGuard)
  @Get('getMusic')
  @Header('ngrok-skip-browser-warning', '3001')
  getMusic(@Query() query, @Res() res: Response) {
    const filePath = this.musicService.getSingleMusic(query.fileName);
    return res.sendFile(filePath);
  }

  @Get('allMusic')
  async getAllFiles(@Res() res: Response) {
    const folderPath = join(process.cwd(), 'music');
    log(folderPath);
    try {
      // Читаем все файлы в папке
      const files = await new Promise<string[]>((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
        });
      });

      // Отправляем названия файлов в ответ
      return res.status(200).json({ files });
    } catch (error) {
      console.error('Error reading folder:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
