import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login(email: string, password: string) {
        console.log(`Email: ${email} --- Password: ${password}`);
    }
    register(email: string, password: string, confirmPassword: string) {
        console.log(
            `Email: ${email} --- Password: ${password} --- Confirm Password: ${confirmPassword}`
        );
    }
}
