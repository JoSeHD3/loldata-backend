import { Injectable } from '@nestjs/common';
import { User } from './interfaces/User';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email: 'john@doe.pl',
            password: 'changeme',
        },
        {
            userId: 2,
            email: 'maria@curie.fr',
            password: 'guess',
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return await this.users.find(user => user.email === email);
    }
}
