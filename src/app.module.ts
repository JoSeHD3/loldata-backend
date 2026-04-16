import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RiotAccountModule } from './riot-account/riot-account.module';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
        RiotAccountModule,
        PlayerModule,
        MatchModule,
        AnalysisModule,
    ],
})
export class AppModule {}
