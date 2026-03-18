import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RiotAccountService } from './riot-account.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRiotAccountDto } from './dto/create-riot-account.dto';
import type { Request } from 'express';
import { JwtPayload } from 'src/auth/jwt.strategy';

@Controller('riot-account')
export class RiotAccountController {
    constructor(private readonly riotAccountService: RiotAccountService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Req() req: Request, @Body() dto: CreateRiotAccountDto) {
        const user = req.user as JwtPayload;

        return this.riotAccountService.create(user.sub, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getMyAccounts(@Req() req: Request) {
        const user = req.user as JwtPayload;

        return this.riotAccountService.findByUserId(user.sub);
    }
}
