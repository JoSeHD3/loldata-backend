import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
    ExtractJwt,
    Strategy,
    StrategyOptions,
    JwtFromRequestFunction,
} from 'passport-jwt';

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }

        const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
            return (req?.cookies?.access_token as string) ?? null;
        };

        const opts: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: jwtSecret,
        };

        super(opts);
    }

    validate(payload: JwtPayload): JwtPayload {
        return payload;
    }
}
