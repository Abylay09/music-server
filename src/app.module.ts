import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { usersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Users } from './users/entities/user.entity';
import { Musics } from './music/entities/music.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { musicModule } from './music/music.module';
import { favMusicModule } from './favMusic/favMusic.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'music'),
      serveRoot: '/music',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Musics],
      synchronize: true,
    }),
    usersModule,
    AuthModule,
    musicModule,
    favMusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
