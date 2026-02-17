import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly saltRounds: number;

    constructor(private readonly usersService: UsersService) {
        const salt = process.env.BCRYPT_SALT_ROUNDS;

        if (!salt)
            throw new Error(
                'BCRYPT_SALT_ROUNDS is not defined in environment variables'
            );

        this.saltRounds = parseInt(salt, 10);

        if (isNaN(this.saltRounds))
            throw new Error('BCRYPT_SALT_ROUNDS must be a number');
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        return {
            message: 'Login successful',
        };
    }

    async register(email: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword)
            throw new BadRequestException("Passwords don't match");

        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) throw new BadRequestException('User already exists');

        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        await this.usersService.create(email, hashedPassword);

        return { message: 'User created successfully' };
    }
}
