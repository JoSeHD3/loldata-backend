import { Controller, Get, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import type { RiotRegion } from 'src/types';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Get('account') // as account we think of riot PUUID
    getAccount(@Query('nick') nick: string, @Query('tag') tag: string) {
        return this.playerService.getAccount(nick, tag);
    }

    @Get('summoner') // Player is a summoner
    getSummoner(
        @Query('region') region: RiotRegion,
        @Query('puuid') puuid: string
    ) {
        return this.playerService.getSummoner(region, puuid);
    }
}
