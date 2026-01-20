import { Controller, Get, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import type { RiotRegion } from 'src/types';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Get('account/:nick/:tag') //as account we think of riot PUUID
    getAccount(@Param('nick') nick: string, @Param('tag') tag: string) {
        return this.playerService.getAccount(nick, tag);
    }

    @Get('summoner/:region/:puuid') //Player is a summoner
    getSummoner(
        @Param('region') region: RiotRegion,
        @Param('puuid') puuid: string
    ) {
        return this.playerService.getSummoner(region, puuid);
    }
}
