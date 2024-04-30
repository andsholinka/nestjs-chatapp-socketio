import { IsString, IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateZodiacDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @ArrayMinSize(1)
    years: number[];
}
