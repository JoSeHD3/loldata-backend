import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RIOT_API_ADDRESS } from 'src/consts';
import { Account } from './interfaces/Account';
import { firstValueFrom } from 'rxjs';

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
}
