import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter a valid email' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}