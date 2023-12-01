import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtContstants } from './constants';
import { usersModule } from '../users/users.module';
@Module({
  imports: [
    usersModule,
    JwtModule.register({
      global: true,
      secret: jwtContstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
