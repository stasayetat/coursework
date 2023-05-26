import {IsArray, IsString} from "class-validator";
import {Item} from "../../items/item.entity";

export class OrderDto {
    @IsString()
    items: string;

    @IsString()
    paymentMethod: string;

    @IsString()
    userEmail: string;

    @IsString()
    address: string;
}