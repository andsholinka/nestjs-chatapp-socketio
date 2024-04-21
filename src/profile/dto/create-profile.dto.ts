import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { Gender } from "src/profile/schemas/profile.schema";

export class CreateProfileDto {
    @IsEmpty({ message: 'User ID is required' })
    userId: User

    @IsNotEmpty()
    @IsString()
    displayName: string;

    @IsNotEmpty()
    @IsEnum(Gender, { message: 'Please enter a valid gender' })
    gender: Gender;

    @IsNotEmpty()
    birthday: Date;

    @IsOptional()
    horoscope?: string;

    @IsNotEmpty()
    height: number;

    @IsNotEmpty()
    weight: number;
}