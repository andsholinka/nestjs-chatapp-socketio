import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { Gender } from "src/profile/schemas/profile.schema";

export class UpdateProfileDto {
    @IsEmpty({ message: 'User ID is required' })
    userId: User

    @IsOptional()
    @IsString()
    displayName: string;

    @IsOptional()
    @IsEnum(Gender, { message: 'Please enter a valid gender' })
    gender: Gender;

    @IsOptional()
    birthday: string;

    @IsOptional()
    horoscope?: string;

    @IsOptional()
    height: number;

    @IsOptional()
    weight: number;
}