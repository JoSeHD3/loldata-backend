import { Module } from '@nestjs/common';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [HttpModule, ConfigModule.forRoot()],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class AppModule {}
