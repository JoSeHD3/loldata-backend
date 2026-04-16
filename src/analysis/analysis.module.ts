import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { MatchModule } from 'src/match/match.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
    imports: [MatchModule, PlayerModule],
    controllers: [AnalysisController],
    providers: [AnalysisService],
})
export class AnalysisModule {}
