import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRiotAccountDto {
    @IsString()
    @IsNotEmpty()
    gameName: string;

    @IsString()
    @IsNotEmpty()
    tagLine: string;
}
