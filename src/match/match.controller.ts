import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchType } from 'src/enums';

@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Get(':puuid/matches')
    getMatchList(
        @Param('puuid') puuid: string,
        @Query('count') count: number = 10,
        @Query('queue') queue: MatchType = MatchType.SOLO
    ) {
        return this.matchService.getMatchList({
            puuid: puuid,
            count: count,
            queue: queue,
        });
    }

    @Get('id/:matchId')
    getMatch(@Param('matchId') matchId: string) {
        return this.matchService.getMatch(matchId);
    }

    @Get('id/:matchId/timeline')
    getTimeline(@Param('matchId') matchId: string) {
        return this.matchService.getTimeline(matchId);
    }
}
