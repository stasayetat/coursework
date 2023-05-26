import {IsString} from "class-validator";

export class ReviewDto {
    @IsString()
    rate: string;

    @IsString()
    bigComment: string;

    @IsString()
    advantages: string;

    @IsString()
    minuses: string;

    @IsString()
    userName: string;

    @IsString()
    itemTitle: string;
}