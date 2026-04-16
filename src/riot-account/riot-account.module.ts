import { Module } from '@nestjs/common';
import { RiotAccountController } from './riot-account.controller';
import { RiotAccountService } from './riot-account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RiotAccount, RiotAccountSchema } from './schemas/riot-account.schema';
import { PlayerModule } from 'src/player/player.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RiotAccount.name, schema: RiotAccountSchema },
        ]),
        PlayerModule,
    ],
    controllers: [RiotAccountController],
    providers: [RiotAccountService],
    exports: [RiotAccountService],
})
export class RiotAccountModule {}
