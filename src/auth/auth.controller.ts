import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import type { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { access_token, message } = await this.authService.login(
            body.email,
            body.password
        );

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });

        return message;
    }

    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.authService.register(
            body.email,
            body.password,
            body.confirmPassword
        );
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        return { message: 'Logged out successfully' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        return {
            user: req.user,
        };
    }
}
