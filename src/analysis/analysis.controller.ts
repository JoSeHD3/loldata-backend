import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalysisResult } from './interfaces/AnalysisResult';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
    constructor(private readonly analysisService: AnalysisService) {}

    @Get(':puuid')
    async analyzeLastGames(
        @Param('puuid') puuid: string
    ): Promise<AnalysisResult> {
        return this.analysisService.analyze(puuid);
    }

    @Get()
    async analyzeByRiotId(
        @Query('gameName') gameName: string,
        @Query('tag') tag: string
    ): Promise<AnalysisResult> {
        return this.analysisService.analyzeByRiotId(gameName, tag);
    }
}
