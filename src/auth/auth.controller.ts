import { Body, Controller, Post, HttpCode, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('registration')
  signup(@Body() signInDto: Record<string, any>, @Response() res: any) {
    try {
      this.authService.signUp(
        signInDto.username,
        signInDto.surname,
        signInDto.email,
        signInDto.password,
      );
      res.status(201).json({
        success: true,
        message: 'Registration successful',
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}
