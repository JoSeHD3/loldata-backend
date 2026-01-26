import { Controller, Get, Param } from '@nestjs/common';
import { AnalysisResult } from './interfaces/AnalysisResult';
import { MatchService } from 'src/match/match.service';
import { mapMatchToPlayerAnalysisData } from './helpers/mapMatchToPlayerAnalysisData';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
    constructor(
        private readonly matchService: MatchService,
        private readonly analysisService: AnalysisService
    ) {}

    @Get(':puuid')
    async analyzeLastGames(
        @Param('puuid') puuid: string
    ): Promise<AnalysisResult> {
        const matchIds = await this.matchService.getMatchList({
            puuid: puuid,
            count: 10,
            queue: 420,
        });

        const matches = await Promise.all(
            matchIds.map(id => this.matchService.getMatch(id))
        );

        const mappedMatches = matches.map(match =>
            mapMatchToPlayerAnalysisData(match, puuid)
        );

        return this.analysisService.analyze(mappedMatches);
    }
}
