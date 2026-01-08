import { Controller, Get, Query } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Get('account') // as account we think of riot PUUID, Player is a Summoner
    getAccount(@Query('nick') nick: string, @Query('tag') tag: string) {
        return this.playerService.getAccount(nick, tag);
    }
}
