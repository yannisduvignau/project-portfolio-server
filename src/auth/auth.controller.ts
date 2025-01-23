import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

export type AuthBody = { email: string; password: string };

//@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  //localhost:3000/auth/login
  // 1. Envoie un mdp et un email
  // 2. API renvoie un token sécurisé "abc123"
  @Post('login')
  async login(
    @Body()
    authBody: AuthBody,
  ) {
    return await this.authService.login({ authBody });
  }

  //localhost:3000/auth/register
  @Post('register')
  async register(@Body() registerBody: CreateUserDto) {
    return await this.authService.register({
      registerBody,
    });
  }

  //localhost:3000/auth/
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuthenticatedUser(@Request() request: RequestWithUser) {
    return await this.userService.getUserById({
      userId: request.user.userId,
    });
  }
}
