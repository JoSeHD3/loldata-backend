import { Injectable } from '@nestjs/common';
import { AnalysisResult } from './interfaces/AnalysisResult';
import { PlayerService } from 'src/player/player.service';
import { MatchService } from 'src/match/match.service';
import { mapMatchToPlayerAnalysisData } from './helpers/mapMatchToPlayerAnalysisData';

@Injectable()
export class AnalysisService {
    constructor(
        private readonly playerService: PlayerService,
        private readonly matchService: MatchService
    ) {}

    async analyze(puuid: string): Promise<AnalysisResult> {
        const numberOfGames = 10;
        const matchIds = await this.matchService.getMatchList({
            puuid: puuid,
            count: numberOfGames,
            queue: 420,
        });

        const matches = await Promise.all(
            matchIds.map(id => this.matchService.getMatch(id))
        );

        const mappedMatches = matches.map(match =>
            mapMatchToPlayerAnalysisData(match, puuid)
        );

        return {
            avgGoldPerMinute:
                mappedMatches.reduce(
                    (acc, match) => acc + match.goldPerMinute,
                    0
                ) / numberOfGames,
            avgCsPerMinute:
                mappedMatches.reduce(
                    (acc, match) => acc + match.csPerMinute,
                    0
                ) / numberOfGames,
            avgKda:
                mappedMatches.reduce((acc, match) => acc + match.kda, 0) /
                numberOfGames,
            avgVisionScore:
                mappedMatches.reduce(
                    (acc, match) => acc + match.visionScore,
                    0
                ) / numberOfGames,
        };
    }

    async analyzeByRiotId(nick: string, tag: string): Promise<AnalysisResult> {
        const account = await this.playerService.getAccount(nick, tag);
        return this.analyze(account.puuid);
    }
}
