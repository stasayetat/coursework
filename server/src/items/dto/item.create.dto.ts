import {IsArray, IsNumber, IsString, MaxLength, ValidateNested} from "class-validator";
import {ValidateMiddleware} from "../../common/validate.middleware";
import {Type} from "class-transformer";
import {Category} from "../category.enum";

export class ItemCreateDto {
    @IsString()
    title: string;
    @IsString()
    category: Category;

    @IsNumber()
    price: number;

    @IsArray()
    photos: string[];

    @IsArray()
    characteristics: Map<string, string>;
}