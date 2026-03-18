import { Injectable } from '@nestjs/common';
import { RiotAccount } from './schemas/riot-account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { CreateRiotAccountDto } from './dto/create-riot-account.dto';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class RiotAccountService {
    constructor(
        @InjectModel(RiotAccount.name)
        private riotAccountModel: Model<RiotAccount>,
        private readonly playerService: PlayerService
    ) {}

    async create(
        userId: string,
        dto: CreateRiotAccountDto
    ): Promise<RiotAccount> {
        const { gameName, tagLine } = dto;

        const { puuid } = await this.playerService.getAccount(
            gameName,
            tagLine
        );
        const region = 'europe';

        const createdAccount = new this.riotAccountModel({
            userId,
            puuid,
            region,
            ...dto,
        });

        return createdAccount.save();
    }

    async findByUserId(userId: string): Promise<RiotAccount[]> {
        return this.riotAccountModel.find({ userId }).exec();
    }

    async findByPUUID(puuid: string): Promise<RiotAccount> {
        const account = await this.riotAccountModel.findOne({ puuid }).exec();
        if (!account) {
            throw new Error(`Riot account with PUUID ${puuid} not found`);
        }
        return account;
    }
}
