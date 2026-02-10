import { Module } from '@nestjs/common';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { AnalysisController } from './analysis/analysis.controller';
import { AnalysisService } from './analysis/analysis.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot(),
        UsersModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [
        PlayerController,
        MatchController,
        AnalysisController,
        AuthController,
    ],
    providers: [PlayerService, MatchService, AnalysisService, AuthService],
})
export class AppModule {}
