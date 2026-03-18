import { Types } from 'mongoose';

export interface IRiotAccount {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    gameName: string;
    tagLine: string;
    puuid: string;
    region: string;
}
