import {IsEmail, IsOptional, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, {message: 'Invalid email'})
    email: string;
    @IsString({message: 'Invalid password'})
    password: string;

    @IsString({message: 'Invalid password'})
    repeatPassword: string;

}