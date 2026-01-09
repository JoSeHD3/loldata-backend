import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RIOT_API_ADDRESS } from 'src/consts';

@Injectable()
export class MatchService {
    private readonly apiKey = process.env.RIOT_API_KEY;

    constructor(private readonly httpService: HttpService) {}

    async getMatchList(params: {
        puuid: string;
        count: number;
        queue: number;
    }): Promise<string[]> {
        const { puuid, ...query } = params;

        const url = `${RIOT_API_ADDRESS}/lol/match/v5/matches/by-puuid/${puuid}/ids`;

        const { data } = await firstValueFrom(
            this.httpService.get<string[]>(url, {
                headers: {
                    'X-Riot-Token': this.apiKey,
                },
                params: query,
            })
        );
        return data;
    }
}
