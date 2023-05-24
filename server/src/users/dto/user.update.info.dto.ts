import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UserUpdateInfoDto {
    @IsString()
    @IsOptional()
    surname: string;

    @IsString()
    @IsOptional()
    name: string;

    email: string;

    @IsString()
    @IsOptional()
    prevPassword: string;

    @IsString()
    @IsOptional()
    newPassword: string;

    @IsString()
    @IsOptional()
    repNewPassword: string;

}