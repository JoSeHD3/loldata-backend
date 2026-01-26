import { Module } from '@nestjs/common';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { AnalysisController } from './analysis/analysis.controller';
import { AnalysisService } from './analysis/analysis.service';

@Module({
    imports: [HttpModule, ConfigModule.forRoot()],
    controllers: [PlayerController, MatchController, AnalysisController],
    providers: [PlayerService, MatchService, AnalysisService],
})
export class AppModule {}
