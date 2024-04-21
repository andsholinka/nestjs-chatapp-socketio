import { Body, Controller, Post, HttpCode, HttpStatus, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() data: SignupDto): Promise<{ token: string }> {
        return this.authService.signUp(data);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() data: LoginDto): Promise<{ token: string }> {
        return this.authService.login(data);
    }
}
