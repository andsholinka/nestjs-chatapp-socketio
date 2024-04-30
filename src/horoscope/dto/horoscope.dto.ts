import { IsString } from "class-validator";

export class CreateHoroscopeDto {
    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsString()
    horoscope: string;
}