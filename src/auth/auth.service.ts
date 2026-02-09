import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    login(email: string, password: string) {
        console.log(`Email: ${email} --- Password: ${password}`);
    }
    register(email: string, password: string, confirmPassword: string) {
        console.log(
            `Email: ${email} --- Password: ${password} --- Confirm Password: ${confirmPassword}`
        );
    }
}
