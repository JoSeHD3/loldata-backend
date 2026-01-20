import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RIOT_API_ADDRESS } from 'src/consts';
import { Match } from './interfaces/Match';

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

    async getMatch(matchId: string): Promise<Match> {
        const url = `${RIOT_API_ADDRESS}/lol/match/v5/matches/${matchId}`;

        const { data } = await firstValueFrom(
            this.httpService.get<Match>(url, {
                headers: {
                    'X-Riot-Token': this.apiKey,
                },
            })
        );

        return data;
    }

    //TODO: FOR LATER DEVELOPMENT
    async getTimeline(matchId: string): Promise<object> {
        const url = `${RIOT_API_ADDRESS}/lol/match/v5/matches/${matchId}/timeline`;

        const { data } = await firstValueFrom(
            this.httpService.get<object>(url, {
                headers: {
                    'X-Riot-Token': this.apiKey,
                },
            })
        );

        return data;
    }
}
