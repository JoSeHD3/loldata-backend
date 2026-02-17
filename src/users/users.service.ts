import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async create(email: string, hashedPassword: string): Promise<User | null> {
        const user = new this.userModel({
            email,
            password: hashedPassword,
        });

        return user.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<User | null> {
        return await this.userModel.findById(id);
    }
}
