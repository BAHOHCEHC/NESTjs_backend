import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{ message: 'password too weak' })
    password: string;
}