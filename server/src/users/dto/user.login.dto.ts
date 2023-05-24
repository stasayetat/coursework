import {IsEmail, IsString} from "class-validator";

export class UserLoginDto {
    @IsEmail({}, {message: 'Invalid email'})
    email: string;
    @IsString({message: 'Invalid password'})
    password: string;


    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}