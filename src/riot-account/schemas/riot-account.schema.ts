import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class RiotAccount {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    gameName: string;

    @Prop({ required: true })
    tagLine: string;

    @Prop({ required: true })
    puuid: string;

    @Prop({ required: true })
    region: string;
}

export const RiotAccountSchema = SchemaFactory.createForClass(RiotAccount);
