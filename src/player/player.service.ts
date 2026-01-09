import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RIOT_API_ADDRESS } from 'src/consts';
import { Account } from './interfaces/Account';
import { firstValueFrom } from 'rxjs';
import { Summoner } from './interfaces/Summoner';
import { getRegionAPIName, isRiotRegion } from 'src/libs';
import type { RiotRegion } from 'src/types';

@Injectable()
export class PlayerService {
    private readonly apiKey = process.env.RIOT_API_KEY;

    constructor(private readonly httpService: HttpService) {}

    async getAccount(nick: string, tag: string): Promise<Account> {
        const url = `${RIOT_API_ADDRESS}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(nick)}/${encodeURIComponent(tag)}`;

        const { data } = await firstValueFrom(
            this.httpService.get<Account>(url, {
                headers: {
                    'X-Riot-Token': this.apiKey,
                },
            })
        );

        return data;
    }

    async getSummoner(region: RiotRegion, puuid: string): Promise<Summoner> {
        const regionAPIName = getRegionAPIName(region);

        if (!isRiotRegion(region)) {
            throw new BadRequestException(`Unsupported region`);
        }

        const url = `${regionAPIName}/lol/summoner/v4/summoners/by-puuid/${puuid}`;

        const { data } = await firstValueFrom(
            this.httpService.get<Summoner>(url, {
                headers: {
                    'X-Riot-Token': this.apiKey,
                },
            })
        );

        return data;
    }
}
