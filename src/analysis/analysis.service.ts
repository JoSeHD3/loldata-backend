import { Injectable } from '@nestjs/common';
import { PlayerAnalysisData } from './interfaces/PlayerAnalysisData';
import { AnalysisResult } from './interfaces/AnalysisResult';

@Injectable()
export class AnalysisService {
    analyze(matches: PlayerAnalysisData[]): AnalysisResult {
        const numberOfGames = matches.length;

        return {
            avgGoldPerMinute:
                matches.reduce((acc, match) => acc + match.goldPerMinute, 0) /
                numberOfGames,
            avgCsPerMinute:
                matches.reduce((acc, match) => acc + match.csPerMinute, 0) /
                numberOfGames,
            avgKda:
                matches.reduce((acc, match) => acc + match.kda, 0) /
                numberOfGames,
            avgVisionScore:
                matches.reduce((acc, match) => acc + match.visionScore, 0) /
                numberOfGames,
        };
    }
}
