import { Injectable } from '@nestjs/common';
import { AnalysisResult } from './interfaces/AnalysisResult';
import { PlayerService } from 'src/player/player.service';
import { MatchService } from 'src/match/match.service';
import { mapMatchToPlayerAnalysisData } from './helpers/mapMatchToPlayerAnalysisData';
import { PlayerAnalysisData } from './interfaces/PlayerAnalysisData';

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

        const average = (
            getter: (match: PlayerAnalysisData) => number
        ): number => {
            const sum = mappedMatches.reduce(
                (acc, match) => acc + getter(match),
                0
            );
            return sum / numberOfGames;
        };

        return {
            avgGoldPerMinute: average(m => m.goldPerMinute),
            avgCsPerMinute: average(m => m.csPerMinute),
            avgKda: average(m => m.kda),
            avgVisionScore: average(m => m.visionScore),
            characteristics: {
                avgCharacteristicVisionScore: average(
                    m => m.characteristics.characteristicVisionScore
                ),
                avgCharacteristicFarmingScore: average(
                    m => m.characteristics.characteristicFarmingScore
                ),
                avgCharacteristicAggressionScore: average(
                    m => m.characteristics.characteristicAggressionScore
                ),
                avgCharacteristicObjectivesScore: average(
                    m => m.characteristics.characteristicObjectivesScore
                ),
                avgCharacteristicSurvivabilityScore: average(
                    m => m.characteristics.characteristicSurvivabilityScore
                ),
                avgCharacteristicMapImpactScore: average(
                    m => m.characteristics.characteristicMapImpactScore
                ),
            },
        };
    }

    async analyzeByRiotId(nick: string, tag: string): Promise<AnalysisResult> {
        const account = await this.playerService.getAccount(nick, tag);
        return this.analyze(account.puuid);
    }
}
