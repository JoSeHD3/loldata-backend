import { Module } from '@nestjs/common';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';

@Module({
    imports: [HttpModule, ConfigModule.forRoot()],
    controllers: [PlayerController, MatchController],
    providers: [PlayerService, MatchService],
})
export class AppModule {}
